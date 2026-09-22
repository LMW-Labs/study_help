"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies, CaseStudy } from "@/data/caseStudies";

// ── Category metadata ─────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Liability: "text-red-400 bg-red-400/10 border-red-400/20",
  Coverage: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Damages: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Investigation: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Workers Compensation": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Property Loss": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Bodily Injury": "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Theft: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Total Loss": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
};

const DIFFICULTY_BADGE: Record<string, string> = {
  foundational: "text-emerald-400 bg-emerald-400/10",
  intermediate: "text-yellow-400 bg-yellow-400/10",
  advanced: "text-red-400 bg-red-400/10",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">📂</div>
      <h2 className="text-2xl font-bold text-white mb-3">No case studies yet</h2>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Drop PDF files containing case studies into the{" "}
        <code className="text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">/casestudy</code>{" "}
        folder at the project root, then run the extraction script to generate this page's content.
      </p>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left text-sm space-y-3">
        <p className="text-slate-400 font-medium">How to add case studies:</p>
        <ol className="space-y-2 text-slate-400 list-decimal list-inside">
          <li>
            Drop your PDF into{" "}
            <code className="text-blue-400">/casestudy/</code>
          </li>
          <li>
            Set your{" "}
            <code className="text-blue-400">ANTHROPIC_API_KEY</code> in your environment
          </li>
          <li>
            Run:{" "}
            <code className="text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
              node scripts/extractCaseStudies.mjs
            </code>
          </li>
          <li>Commit and push — the page updates automatically</li>
        </ol>
      </div>
    </div>
  );
}

function CaseCard({
  study,
  selected,
  onClick,
}: {
  study: CaseStudy;
  selected: boolean;
  onClick: () => void;
}) {
  const catColor = CATEGORY_COLORS[study.category] ?? "text-slate-400 bg-slate-400/10 border-slate-400/20";
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? "bg-slate-800 border-blue-500/60 shadow-lg shadow-blue-500/10"
          : "bg-slate-900 border-slate-800 hover:border-slate-600"
      }`}
    >
      <div className="flex items-start gap-2 mb-2 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${catColor}`}>
          {study.category}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_BADGE[study.difficulty]}`}>
          {study.difficulty}
        </span>
      </div>
      <p className="text-white text-sm font-medium leading-snug">{study.title}</p>
      <p className="text-slate-500 text-xs mt-1 truncate">{study.source}</p>
    </button>
  );
}

function DiscussionBlock({
  question,
  index,
}: {
  question: CaseStudy["discussionQuestions"][number];
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
            {index + 1}
          </span>
          <p className="text-white font-medium leading-relaxed">{question.question}</p>
        </div>

        {question.hint && !revealed && (
          <p className="text-slate-500 text-xs italic border-l-2 border-slate-700 pl-3 mb-4">
            Hint: {question.hint}
          </p>
        )}

        {/* Think space */}
        {!revealed && (
          <div className="mb-4">
            <label className="text-xs text-slate-500 mb-1.5 block">Your thinking (optional):</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your answer before revealing…"
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 outline-none resize-none transition-colors"
            />
          </div>
        )}

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            Reveal Model Answer
          </button>
        ) : (
          <div className="space-y-3">
            {notes && (
              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Your notes:</p>
                <p className="text-sm text-slate-300 whitespace-pre-wrap">{notes}</p>
              </div>
            )}
            <div className="bg-blue-950/40 border border-blue-800/40 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                Model Answer
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">{question.modelAnswer}</p>
            </div>
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Hide answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseDetail({ study }: { study: CaseStudy }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const catColor = CATEGORY_COLORS[study.category] ?? "text-slate-400 bg-slate-400/10 border-slate-400/20";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${catColor}`}>
            {study.category}
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${DIFFICULTY_BADGE[study.difficulty]}`}>
            {study.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-bold text-white mb-1">{study.title}</h2>
        <p className="text-xs text-slate-500">Source: {study.source}</p>
      </div>

      {/* Scenario */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          📋 The Scenario
        </h3>
        <p className="text-slate-200 leading-relaxed">{study.scenario}</p>
      </div>

      {/* Key Facts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          🗂 Key Facts
        </h3>
        <ul className="space-y-2">
          {study.facts.map((fact, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-300">
              <span className="text-blue-400 shrink-0 mt-0.5">▸</span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Discussion Questions */}
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
          💬 Discussion Questions
        </h3>
        <p className="text-xs text-slate-500 mb-4 px-1">
          Think through each question before revealing the model answer. Write your reasoning — it helps more than reading alone.
        </p>
        <div className="space-y-4">
          {study.discussionQuestions.map((q, i) => (
            <DiscussionBlock key={i} question={q} index={i} />
          ))}
        </div>
      </div>

      {/* Deep Analysis — toggled */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setAnalysisOpen(!analysisOpen)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
        >
          <span className="font-semibold text-white">🔬 Deep Analysis</span>
          <span className="text-slate-400 text-lg">{analysisOpen ? "−" : "+"}</span>
        </button>

        {analysisOpen && (
          <div className="px-5 pb-5 space-y-5 border-t border-slate-800 pt-5">
            {/* Key Issues */}
            <div>
              <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                ⚠ Key Issues at Play
              </h4>
              <ul className="space-y-1.5">
                {study.analysis.keyIssues.map((issue, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-red-400 shrink-0">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why it matters */}
            <div className="bg-amber-950/20 border border-amber-800/30 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                💡 Why This Matters for an Adjuster
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{study.analysis.whyItMatters}</p>
            </div>

            {/* How to approach */}
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                ✅ How to Approach It
              </h4>
              <ol className="space-y-2">
                {study.analysis.howToApproach.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Common mistakes */}
            <div>
              <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                ❌ Common Mistakes to Avoid
              </h4>
              <ul className="space-y-1.5">
                {study.analysis.commonMistakes.map((m, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-rose-400 shrink-0">✗</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Concept tags */}
            {study.analysis.conceptConnections.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Concepts Illustrated
                </h4>
                <div className="flex flex-wrap gap-2">
                  {study.analysis.conceptConnections.map((tag, i) => (
                    <Link
                      key={i}
                      href="/study"
                      className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full border border-slate-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CasesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(
    caseStudies.length > 0 ? caseStudies[0].id : null
  );
  const [filter, setFilter] = useState<string>("All");

  if (caseStudies.length === 0) return <EmptyState />;

  const categories = ["All", ...Array.from(new Set(caseStudies.map((c) => c.category)))];
  const filtered = filter === "All" ? caseStudies : caseStudies.filter((c) => c.category === filter);
  const selected = caseStudies.find((c) => c.id === selectedId) ?? filtered[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-white mt-3">Case Studies</h1>
        <p className="text-slate-400 mt-1 text-sm max-w-2xl">
          Real scenarios for deeper understanding — focus on the <em>why</em> behind each decision,
          not just the steps. Think through each discussion question before revealing the answer.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors border ${
              filter === cat
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            {cat}
            <span className="ml-1.5 opacity-60">
              ({cat === "All" ? caseStudies.length : caseStudies.filter((c) => c.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar list */}
        <div className="space-y-2 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-1">
          {filtered.map((study) => (
            <CaseCard
              key={study.id}
              study={study}
              selected={selected?.id === study.id}
              onClick={() => setSelectedId(study.id)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div className="min-w-0">
          {selected ? (
            <CaseDetail key={selected.id} study={selected} />
          ) : (
            <div className="text-center py-20 text-slate-500">
              <p>Select a case study from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
