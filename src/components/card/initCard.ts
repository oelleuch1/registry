import { addCleanup, runAllCleanups } from '../../cleanup.ts'

// first time for exec

export function initCard(): void {
  const root = document.querySelector<HTMLElement>("[data-card-root]");

  if (!root || root.dataset.isExecuted === "true") {
    return;
  }

  const closeBtn = root.querySelector<HTMLButtonElement>("[data-card-close]");
  const startBtn = root.querySelector<HTMLButtonElement>("[data-card-start]");
  const clickBtn = root.querySelector<HTMLButtonElement>("[data-card-click]");
  const countEl = root.querySelector<HTMLElement>("[data-card-count]");

  if (!closeBtn || !startBtn || !clickBtn || !countEl) {
    return;
  }

  root.dataset.isExecuted = "true";
  let count = 0;
  let intervalId: number | null = null;

  const onStart = () => {
    intervalId = window.setInterval(() => {
      count += 1;
      countEl.textContent = String(count);
      console.log("Timer is:", count);
    }, 1000);
  };
  addCleanup(root, () => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  });

  const onClick = () => {
    alert("Button clicked!");
  };

  const onClose = () => {
    root.classList.add("hidden");
    runAllCleanups(root);
    root.dataset.bound = "false";
  };

  startBtn.addEventListener("click", onStart);
  addCleanup(root, () => startBtn.removeEventListener("click", onStart));

  clickBtn.addEventListener("click", onClick);
  addCleanup(root, () => clickBtn.removeEventListener("click", onClick));

  closeBtn.addEventListener("click", onClose);
  addCleanup(root, () => closeBtn.removeEventListener("click", onClose));
}
