"use client";

import { useState, useTransition, useCallback, useRef } from "react";
import Link from "next/link";
import { searchLocal, LocalResult } from "@/lib/localSearch";
import type { CaseLawResult } from "@/app/api/search/route";

const SUGGESTED = [
  "permissive use",
  "non-waiver agreement",
  "total loss investigation",
  "negligence elements",
  "subrogation",
  "chain of custody",
  "medical payments coverage",
  "workers compensation",
];

type Tab = "study" | "caselaw";

function StudyResultCard({ result }: { result: LocalResult }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-xl p-4 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
          {result.card.category}
        </span>
        <span className="text-xs text-slate-600">{result.sectionTitle}</span>
      </div>
      <p className="text-white font-medium text-sm mb-1">{result.card.term}</p>
      {flipped ? (
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
          <p className="text-slate-300 text-sm leading-relaxed">{result.card.definition}</p>
          {result.card.example && (
            <p className="text-blue-300 text-xs italic border-l-2 border-blue-600 pl-3">
              {result.card.example}
            </p>
          )}
        </div>
      ) : (
        <p className="text-slate-500 text-xs mt-1">tap to reveal definition</p>
      )}
    </div>
  );
}

function CaseLawCard({ result }: { result: CaseLawResult }) {
  return (
    <a
      href={result.absolute_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
          Case Law
        </span>
        <span className="text-xs text-slate-500">{result.date_filed?.slice(0, 4)}</span>
      </div>
      <p className="text-white font-medium text-sm group-hover:text-amber-300 transition-colors mb-1 leading-snug">
        {result.case_name}
      </p>
      {result.court && (
        <p className="text-xs text-slate-500 mb-2">{result.court}</p>
      )}
      {result.snippet && (
        <p
          className="text-slate-400 text-xs leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: result.snippet }}
        />
      )}
      <span className="inline-block mt-2 text-xs text-amber-400 group-hover:underline">
        View on CourtListener →
      </span>
    </a>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("study");
  const [localResults, setLocalResults] = useState<LocalResult[]>([]);
  const [caselaw, setCaselaw] = useState<CaseLawResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback((q: string) => {
    setLocalResults(searchLocal(q));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) { setCaselaw([]); return; }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          const data = await res.json();
          setCaselaw(data.caselaw ?? []);
        } catch {
          // network error
        }
      });
    }, 500);
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    runSearch(val);
  };

  const tabCounts = { study: localResults.length, caselaw: caselaw.length };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-white mt-3">Search</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Search your study cards and US insurance case law simultaneously.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">
          🔍
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Search insurance topics, terms, or case law…"
          className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-colors text-sm"
          autoFocus
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Suggested chips */}
      {!query && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs text-slate-600 py-1.5">Try:</span>
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => handleInput(s)}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Tabs + results */}
      {query && (
        <>
          <div className="flex gap-1 bg-slate-900/50 rounded-xl p-1 mb-6 border border-slate-800">
            {(["study", "caselaw"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-slate-800 text-white shadow"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span>{tab === "study" ? "🃏" : "⚖️"}</span>
                <span>{tab === "study" ? "Study Cards" : "Case Law"}</span>
                {tabCounts[tab] > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                  }`}>
                    {tabCounts[tab]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "study" && (
            localResults.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <p className="text-4xl mb-3">🔍</p>
                <p>No study cards match &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {localResults.map((r) => <StudyResultCard key={r.card.id} result={r} />)}
              </div>
            )
          )}

          {activeTab === "caselaw" && (
            isPending && caselaw.length === 0 ? (
              <div className="grid md:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 animate-pulse">
                    <div className="h-3 bg-slate-800 rounded w-24 mb-3" />
                    <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-slate-800 rounded w-full mb-1" />
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : caselaw.length > 0 ? (
              <div>
                <p className="text-xs text-slate-500 mb-4">
                  Results from{" "}
                  <a href="https://www.courtlistener.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    CourtListener
                  </a>{" "}
                  — free, open US case law database
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {caselaw.map((r, i) => <CaseLawCard key={i} result={r} />)}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p className="text-4xl mb-3">⚖️</p>
                <p>No case law found for &ldquo;{query}&rdquo;</p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
