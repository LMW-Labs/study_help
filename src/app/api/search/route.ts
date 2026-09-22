import { NextRequest, NextResponse } from "next/server";

export interface CaseLawResult {
  case_name: string;
  court: string;
  date_filed: string;
  snippet: string;
  absolute_url: string;
  citation?: string;
}

export interface WebResult {
  title: string;
  url: string;
  description: string;
  source: string;
}

export interface SearchResponse {
  caselaw: CaseLawResult[];
  web: WebResult[];
  hasWebKey: boolean;
  error?: string;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  const type = request.nextUrl.searchParams.get("type") ?? "all";

  if (!q) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const response: SearchResponse = { caselaw: [], web: [], hasWebKey: !!process.env.BRAVE_SEARCH_API_KEY };

  const insuranceQuery = q.toLowerCase().includes("insurance") ? q : `insurance ${q}`;

  // ── Case Law via CourtListener (free, no key needed) ──────────────────────
  if (type === "all" || type === "caselaw") {
    try {
      const url = new URL("https://www.courtlistener.com/api/rest/v4/search/");
      url.searchParams.set("q", insuranceQuery);
      url.searchParams.set("type", "o");
      url.searchParams.set("order_by", "score desc");
      url.searchParams.set("stat_Precedential", "on");

      const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        response.caselaw = (data.results ?? []).slice(0, 6).map((r: Record<string, string>) => ({
          case_name: r.caseName ?? r.case_name ?? "Unknown Case",
          court: r.court ?? r.court_id ?? "",
          date_filed: r.dateFiled ?? r.date_filed ?? "",
          snippet: r.snippet ?? "",
          absolute_url: `https://www.courtlistener.com${r.absolute_url ?? ""}`,
          citation: r.citation ?? "",
        }));
      }
    } catch {
      // CourtListener unavailable — silently skip
    }
  }

  // ── Web Search via Brave (optional, needs BRAVE_SEARCH_API_KEY) ───────────
  if ((type === "all" || type === "web") && process.env.BRAVE_SEARCH_API_KEY) {
    try {
      const braveUrl = new URL("https://api.search.brave.com/res/v1/web/search");
      braveUrl.searchParams.set("q", insuranceQuery);
      braveUrl.searchParams.set("count", "6");
      braveUrl.searchParams.set("search_lang", "en");

      const res = await fetch(braveUrl.toString(), {
        headers: {
          "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY,
          Accept: "application/json",
          "Accept-Encoding": "gzip",
        },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        response.web = (data.web?.results ?? []).map((r: Record<string, string>) => ({
          title: r.title ?? "",
          url: r.url ?? "",
          description: r.description ?? "",
          source: new URL(r.url ?? "https://example.com").hostname.replace("www.", ""),
        }));
      }
    } catch {
      // Brave unavailable — silently skip
    }
  }

  return NextResponse.json(response);
}
