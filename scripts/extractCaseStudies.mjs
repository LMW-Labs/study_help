/**
 * Case Study Extractor
 * --------------------
 * Drop PDF files into /casestudy, then run:
 *   node scripts/extractCaseStudies.mjs
 *
 * Requires: pip install pymupdf anthropic (Python)
 *           ANTHROPIC_API_KEY in environment
 *
 * What it does:
 *   1. Finds all PDFs in /casestudy
 *   2. Renders each page to a PNG image via PyMuPDF
 *   3. Sends pages to Claude Vision to extract and structure case studies
 *   4. Writes structured output to src/data/caseStudies.ts
 */

import { execSync, spawnSync } from "child_process";
import { existsSync, readdirSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CASE_STUDY_DIR = join(ROOT, "casestudy");
const OUT_FILE = join(ROOT, "src", "data", "caseStudies.ts");
const TMP_DIR = join(ROOT, ".casestudy-tmp");

const client = new Anthropic();

// ── Helpers ──────────────────────────────────────────────────────────────────

function renderPdfToImages(pdfPath, outDir) {
  const script = `
import pymupdf, os, sys
doc = pymupdf.open(sys.argv[1])
os.makedirs(sys.argv[2], exist_ok=True)
mat = pymupdf.Matrix(2, 2)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=mat)
    pix.save(os.path.join(sys.argv[2], f"page_{i+1:03d}.png"))
print(f"Rendered {len(doc)} pages")
`;
  const result = spawnSync("python", ["-c", script, pdfPath, outDir], {
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error(`PDF render failed: ${result.stderr}`);
  console.log(`  ${result.stdout.trim()}`);
}

function imageToBase64(filePath) {
  const { readFileSync } = await import("fs");
  return readFileSync(filePath).toString("base64");
}

async function extractFromPages(pageFiles, pdfName) {
  console.log(`  Sending ${pageFiles.length} page(s) to Claude…`);

  const { readFileSync } = await import("fs");
  const imageContent = pageFiles.map((p) => ({
    type: "image",
    source: {
      type: "base64",
      media_type: "image/png",
      data: readFileSync(p).toString("base64"),
    },
  }));

  const prompt = `You are an insurance education assistant. These images are pages from an insurance training document containing case studies.

Extract ALL case studies from these pages. For each case study, structure it as follows:

Return a JSON array where each element has:
{
  "title": "Short descriptive title (e.g. 'Farm Tractor Employee Injury')",
  "category": one of ["Liability", "Coverage", "Damages", "Investigation", "Workers Compensation", "Property Loss", "Bodily Injury", "Theft", "Total Loss"],
  "difficulty": one of ["foundational", "intermediate", "advanced"],
  "scenario": "A clear, complete description of the fact pattern in 2-4 sentences. Write it as a narrative.",
  "facts": ["Key fact 1", "Key fact 2", ...],  // 4-8 bullet-point facts extracted from the scenario
  "discussionQuestions": [
    {
      "question": "Open-ended question probing deeper understanding",
      "hint": "Optional: a guiding hint to help the student think",
      "modelAnswer": "A thorough 3-5 sentence model answer explaining the WHY and HOW, not just WHAT"
    }
  ],  // 3-5 discussion questions per case
  "analysis": {
    "keyIssues": ["Issue 1", "Issue 2", ...],  // 3-5 legal/coverage/liability issues at play
    "whyItMatters": "2-3 sentences explaining the deeper significance of this case for an adjuster",
    "howToApproach": ["Step 1: ...", "Step 2: ...", ...],  // Concrete adjuster action steps
    "commonMistakes": ["Mistake 1", "Mistake 2", ...],  // What adjusters commonly get wrong here
    "conceptConnections": ["non-waiver agreement", "permissive use", ...]  // insurance concepts this case illustrates
  }
}

IMPORTANT:
- Focus on the WHY behind each decision, not just procedural steps
- Discussion questions should create deeper understanding, not test memorization
- Model answers should explain reasoning, not just state facts
- If the page contains review questions referencing case studies, treat each numbered case as a separate case study
- Return ONLY a valid JSON array, no markdown, no explanation

Source file: ${pdfName}`;

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    messages: [
      {
        role: "user",
        content: [...imageContent, { type: "text", text: prompt }],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  // Strip markdown code fences if present
  const jsonText = text.replace(/^```(?:json)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();

  return JSON.parse(jsonText);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
  }

  const pdfs = readdirSync(CASE_STUDY_DIR).filter((f) =>
    f.toLowerCase().endsWith(".pdf")
  );

  if (pdfs.length === 0) {
    console.log("No PDFs found in /casestudy. Drop PDF files there and re-run.");
    process.exit(0);
  }

  console.log(`Found ${pdfs.length} PDF(s) in /casestudy:\n  ${pdfs.join("\n  ")}\n`);

  mkdirSync(TMP_DIR, { recursive: true });

  const allStudies = [];

  for (const pdf of pdfs) {
    const pdfPath = join(CASE_STUDY_DIR, pdf);
    const imgDir = join(TMP_DIR, pdf.replace(".pdf", ""));
    console.log(`\nProcessing: ${pdf}`);

    renderPdfToImages(pdfPath, imgDir);

    const pages = readdirSync(imgDir)
      .filter((f) => f.endsWith(".png"))
      .sort()
      .map((f) => join(imgDir, f));

    // Send in batches of 8 pages (Claude image limit)
    const BATCH = 8;
    for (let i = 0; i < pages.length; i += BATCH) {
      const batch = pages.slice(i, i + BATCH);
      console.log(`  Pages ${i + 1}–${Math.min(i + BATCH, pages.length)}…`);
      try {
        const studies = await extractFromPages(batch, pdf);
        if (Array.isArray(studies)) {
          for (const s of studies) {
            s.id = `${pdf.replace(/\s+/g, "-").replace(".pdf", "")}-${allStudies.length + 1}`;
            s.source = pdf;
            allStudies.push(s);
          }
          console.log(`  ✓ Extracted ${studies.length} case study/studies`);
        }
      } catch (err) {
        console.error(`  ✗ Failed on batch starting page ${i + 1}:`, err.message);
      }
    }
  }

  // Clean up temp images
  rmSync(TMP_DIR, { recursive: true, force: true });

  // Write output file
  const output = `// AUTO-GENERATED by scripts/extractCaseStudies.mjs
// Do not edit manually — drop PDFs in /casestudy and re-run the script.
// Last generated: ${new Date().toISOString()}
// Sources: ${pdfs.join(", ")}

export interface DiscussionQuestion {
  question: string;
  hint?: string;
  modelAnswer: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  source: string;
  category: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  scenario: string;
  facts: string[];
  discussionQuestions: DiscussionQuestion[];
  analysis: {
    keyIssues: string[];
    whyItMatters: string;
    howToApproach: string[];
    commonMistakes: string[];
    conceptConnections: string[];
  };
}

export const caseStudies: CaseStudy[] = ${JSON.stringify(allStudies, null, 2)};
`;

  writeFileSync(OUT_FILE, output, "utf8");
  console.log(`\n✓ Wrote ${allStudies.length} case study/studies to src/data/caseStudies.ts`);
  console.log("  Run `npm run dev` to see them in the app.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
