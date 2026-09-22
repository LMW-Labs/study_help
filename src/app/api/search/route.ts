import { NextRequest, NextResponse } from "next/server";

export interface CaseLawResult {
  case_name: string;
  court: string;
  date_filed: string;
  snippet: string;
  absolute_url: string;
  citation?: string;
}

export interface SearchResponse {
  caselaw: CaseLawResult[];
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const insuranceQuery = q.toLowerCase().includes("insurance") ? q : `insurance ${q}`;

  let caselaw: CaseLawResult[] = [];

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
      caselaw = (data.results ?? []).slice(0, 6).map((r: Record<string, string>) => ({
        case_name: r.caseName ?? r.case_name ?? "Unknown Case",
        court: r.court ?? r.court_id ?? "",
        date_filed: r.dateFiled ?? r.date_filed ?? "",
        snippet: r.snippet ?? "",
        absolute_url: `https://www.courtlistener.com${r.absolute_url ?? ""}`,
        citation: r.citation ?? "",
      }));
    }
  } catch {
    // CourtListener unavailable — return empty
  }

  return NextResponse.json({ caselaw });
}
