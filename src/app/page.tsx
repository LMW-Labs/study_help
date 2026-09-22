import Link from "next/link";
import { studySections } from "@/data/studyContent";
import { quizzes } from "@/data/quizzes";

export default function Home() {
  const totalCards = studySections.reduce((acc, s) => acc + s.cards.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6">
          <span>📋</span> AT-Investigation Course — Claims Adjuster Training
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Hi Amber 👋 — Let&apos;s Study
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Your interactive study tool for Insurance Claims Investigation. Master
          the material through flashcards, then test yourself with two full quizzes.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-1">{studySections.length}</div>
          <div className="text-slate-400 text-sm">Study Sections</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-1">{totalCards}</div>
          <div className="text-slate-400 text-sm">Flashcards</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-1">
            {quizzes.reduce((acc, q) => acc + q.questions.length, 0)}
          </div>
          <div className="text-slate-400 text-sm">Quiz Questions</div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Study Cards */}
        <Link
          href="/study"
          className="group bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-blue-500/20 transition-colors">
              🃏
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                Study Flashcards
              </h2>
              <p className="text-slate-400 text-sm mb-3">
                {totalCards} cards across {studySections.length} topics. Flip each card to reveal the full definition and examples.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {studySections.map((s) => (
                  <span key={s.id} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Quizzes */}
        <div className="flex flex-col gap-4">
          {quizzes.map((quiz, i) => (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-emerald-500/10 flex items-start gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform ${
                  i === 0 ? "bg-emerald-500/10" : "bg-purple-500/10"
                }`}
              >
                {i === 0 ? "📝" : "🎯"}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors text-sm mb-0.5">
                  {quiz.title}
                </h3>
                <p className="text-slate-500 text-xs">{quiz.description}</p>
                <span className="inline-block mt-2 text-xs text-emerald-400">
                  {quiz.questions.length} questions →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Topics Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">📚 What You&apos;ll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {studySections.map((section) => (
            <div key={section.id} className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 shrink-0" />
              <div>
                <div className="text-sm font-medium text-slate-200">{section.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {section.cards.length} cards · {section.keyPoints.length} key points
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Keys link */}
      <div className="text-center">
        <Link
          href="/answer-key/1"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm underline underline-offset-4 transition-colors"
        >
          View Answer Keys →
        </Link>
      </div>
    </div>
  );
}
