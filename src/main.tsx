import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initCard } from "./components/card/initCard.ts";
import { runMutationObserverExamples } from "./mutationObserver.ts";

createRoot(document.getElementById("root")!).render(<App />);

window.onload = () => {
  initCard();
  runMutationObserverExamples();
  window.addEventListener("nav-page-changed", updateCount);
};

const updateCount = () => {
  console.log("updateCount");
  const badge = document.querySelector<HTMLSpanElement>(
    "[data-nav-change-count]",
  );
  if (!badge) {
    return;
  }

  badge.textContent = String(Number(badge.textContent) + 1);
};
