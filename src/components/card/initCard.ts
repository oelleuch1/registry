import { addCleanup } from "../../cleanup.ts";

export function initCard(root: HTMLElement): void {
  if (root.dataset.initialized === "true") {
    return;
  }

  const closeBtn = root.querySelector<HTMLButtonElement>("[data-card-close]");
  const startBtn = root.querySelector<HTMLButtonElement>("[data-card-start]");
  const clickBtn = root.querySelector<HTMLButtonElement>("[data-card-click]");
  const countEl = root.querySelector<HTMLElement>("[data-card-count]");

  if (!closeBtn || !startBtn || !clickBtn || !countEl) {
    return;
  }

  root.dataset.initialized = "true";

  let count = Number(countEl.textContent ?? "0") || 0;
  let intervalId: number | null = null;

  const onStart = () => {
    if (intervalId !== null) {
      return;
    }

    intervalId = window.setInterval(() => {
      count += 1;
      countEl.textContent = String(count);
      console.log("Timer is:", count);
    }, 1000);
  };

  const onClick = () => {
    alert("Button clicked!");
  };

  const onClose = () => {
    root.classList.add("hidden");
  };

  startBtn.addEventListener("click", onStart);
  addCleanup(root, () => startBtn.removeEventListener("click", onStart));

  clickBtn.addEventListener("click", onClick);
  addCleanup(root, () => clickBtn.removeEventListener("click", onClick));

  closeBtn.addEventListener("click", onClose);
  addCleanup(root, () => closeBtn.removeEventListener("click", onClose));

  addCleanup(root, () => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  });

  addCleanup(root, () => {
    delete root.dataset.initialized;
  });
}
