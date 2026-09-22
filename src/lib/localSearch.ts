import { studySections, StudyCard } from "@/data/studyContent";

export interface LocalResult {
  card: StudyCard;
  sectionTitle: string;
  score: number;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function termFrequency(tokens: string[], term: string): number {
  return tokens.filter((t) => t === term || t.startsWith(term)).length;
}

export function searchLocal(query: string): LocalResult[] {
  if (!query.trim()) return [];
  const queryTokens = tokenize(query);
  const results: LocalResult[] = [];

  for (const section of studySections) {
    for (const card of section.cards) {
      const cardText = `${card.term} ${card.definition} ${card.example ?? ""} ${card.category}`;
      const cardTokens = tokenize(cardText);
      let score = 0;
      for (const qToken of queryTokens) {
        const tf = termFrequency(cardTokens, qToken);
        if (tf > 0) {
          // Boost score if match is in the term (front of card)
          const termBoost = tokenize(card.term).some((t) => t.startsWith(qToken)) ? 3 : 1;
          score += tf * termBoost;
        }
      }
      if (score > 0) {
        results.push({ card, sectionTitle: section.title, score });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}
