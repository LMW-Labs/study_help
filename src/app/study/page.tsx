"use client";

import { useState } from "react";
import Link from "next/link";
import { studySections, StudyCard } from "@/data/studyContent";

function FlashCard({ card }: { card: StudyCard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "200px",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-slate-900 border border-slate-700 rounded-xl p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
              {card.category}
            </span>
            <span className="text-slate-600 text-xs">tap to flip</span>
          </div>
          <div>
            <p className="text-white font-semibold text-lg leading-snug">{card.term}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-blue-950 border border-blue-800 rounded-xl p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-xs font-medium text-blue-300 bg-blue-400/10 px-2 py-0.5 rounded-full self-start">
            {card.category}
          </span>
          <div className="space-y-2">
            <p className="text-slate-200 text-sm leading-relaxed">{card.definition}</p>
            {card.example && (
              <p className="text-blue-300 text-xs italic border-l-2 border-blue-500 pl-3 mt-3">
                Example: {card.example}
              </p>
            )}
          </div>
          <span className="text-slate-500 text-xs self-end">tap to flip back</span>
        </div>
      </div>
    </div>
  );
}

export default function StudyPage() {
  const [activeSection, setActiveSection] = useState(studySections[0].id);
  const [cardIndex, setCardIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"one" | "all">("one");

  const section = studySections.find((s) => s.id === activeSection)!;
  const currentCard = section.cards[cardIndex];

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    setCardIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-white mt-3">Study Flashcards</h1>
        <p className="text-slate-400 mt-1">Click any card to reveal the definition</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {studySections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSectionChange(s.id)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === s.id
                ? "bg-blue-500 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {s.title}
            <span className={`ml-1.5 text-xs ${activeSection === s.id ? "text-blue-200" : "text-slate-600"}`}>
              ({s.cards.length})
            </span>
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">{section.title}</h2>
        <p className="text-slate-400 text-sm mb-4">{section.summary}</p>
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Key Points</p>
          {section.keyPoints.map((point, i) => (
            <div key={i} className="flex gap-2 text-sm text-slate-300">
              <span className="text-blue-400 shrink-0 mt-0.5">•</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-400 text-sm">
          {section.cards.length} cards in this section
        </p>
        <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode("one")}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              viewMode === "one" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            One at a time
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              viewMode === "all" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Show all
          </button>
        </div>
      </div>

      {viewMode === "one" ? (
        <div className="space-y-4">
          <FlashCard key={`${activeSection}-${cardIndex}`} card={currentCard} />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCardIndex(Math.max(0, cardIndex - 1))}
              disabled={cardIndex === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
            >
              ← Previous
            </button>
            <span className="text-slate-500 text-sm">
              {cardIndex + 1} / {section.cards.length}
            </span>
            <button
              onClick={() => setCardIndex(Math.min(section.cards.length - 1, cardIndex + 1))}
              disabled={cardIndex === section.cards.length - 1}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm disabled:opacity-30 hover:bg-slate-700 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {section.cards.map((card) => (
            <FlashCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
