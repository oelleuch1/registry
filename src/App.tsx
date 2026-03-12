import { useState } from "react";
import { Card } from "./components/card/Card.tsx";

function App() {
  const [page, setPage] = useState<"first" | "second">("first");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">Registers</div>
          <span
            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-medium text-white"
            data-nav-change-count
          >
            0
          </span>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => setPage("first")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === "first"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              First Page
            </button>
            <button
              type="button"
              onClick={() => setPage("second")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                page === "second"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Second Page
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        {page === "first" ? (
          <>
            <h1 className="text-2xl font-semibold">First Page</h1>
            <Card />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">Second Page</h1>
            <p className="max-w-2xl text-slate-600">
              This is the second page. Use the navigation above to switch back
              to the first page and see the Card component.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
