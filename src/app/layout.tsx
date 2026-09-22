import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insurance Claims Study Tool — Amber",
  description: "Interactive study tool for insurance claims investigation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white hover:text-blue-400 transition-colors">
              <span className="text-blue-400 text-xl">⚖️</span>
              <span>AT-Investigation Study</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link href="/study" className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                Study Cards
              </Link>
              <Link href="/quiz/1" className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                Quiz 1
              </Link>
              <Link href="/quiz/2" className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                Quiz 2
              </Link>
              <Link href="/answer-key/1" className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                Keys
              </Link>
              <Link href="/cases" className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                Cases
              </Link>
              <Link href="/search" className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium">
                🔍 Search
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800 text-center py-4 text-slate-500 text-xs">
          Insurance Claims Investigation — AT-Investigation Course Study Tool
        </footer>
      </body>
    </html>
  );
}
