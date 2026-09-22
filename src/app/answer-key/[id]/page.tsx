import Link from "next/link";
import { quizzes } from "@/data/quizzes";
import { notFound } from "next/navigation";

export default async function AnswerKeyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = quizzes.find((q) => q.id === id);
  if (!quiz) notFound();

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link href={`/quiz/${id}`} className="text-slate-400 hover:text-white text-sm transition-colors">
            {quiz.title}
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300 text-sm">Answer Key</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-4">Answer Key</h1>
        <p className="text-slate-400 mt-1">{quiz.title}</p>
      </div>

      {/* Quick Reference Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Reference</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {quiz.questions.map((q, i) => (
            <div key={q.id} className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs text-slate-500 mb-1">Q{i + 1}</div>
              <div className="text-lg font-bold text-emerald-400">
                {letters[q.correctIndex]}
              </div>
              <div className="text-xs text-slate-500 mt-1 truncate">{q.topic.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternate quizzes nav */}
      <div className="flex gap-2 mb-8">
        {quizzes.map((q) => (
          <Link
            key={q.id}
            href={`/answer-key/${q.id}`}
            className={`text-sm px-4 py-2 rounded-lg transition-colors ${
              q.id === id
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Quiz {q.id} Key
          </Link>
        ))}
      </div>

      {/* Full Answer Key */}
      <div className="space-y-6">
        {quiz.questions.map((q, i) => (
          <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Question header */}
            <div className="px-5 py-4 border-b border-slate-800">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs text-blue-400 mb-1">{q.topic}</p>
                  <p className="text-white text-sm font-medium leading-relaxed">{q.question}</p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="px-5 py-4 space-y-2">
              {q.options.map((option, j) => {
                const isCorrect = j === q.correctIndex;
                return (
                  <div
                    key={j}
                    className={`flex items-start gap-3 px-3 py-2.5 rounded-lg ${
                      isCorrect
                        ? "bg-emerald-900/30 border border-emerald-700"
                        : "bg-slate-800/50"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isCorrect
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-700 text-slate-500"
                      }`}
                    >
                      {isCorrect ? "✓" : letters[j]}
                    </span>
                    <span className={`text-sm leading-relaxed ${isCorrect ? "text-emerald-200 font-medium" : "text-slate-500"}`}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="px-5 pb-4">
              <div className="bg-amber-900/10 border border-amber-800/30 rounded-lg p-4">
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                  Why this answer is correct
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/quiz/${id}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors text-sm"
        >
          Take Quiz {id} →
        </Link>
      </div>
    </div>
  );
}
