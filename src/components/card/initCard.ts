import { addCleanup, runAllCleanups } from '../../cleanup.ts'

export function initCard(): void {
  const root = document.querySelector<HTMLElement>("[data-card-root]");
  if (!root || root.dataset.bound === "true") {
    return;
  }

  const closeBtn = root.querySelector<HTMLButtonElement>("[data-card-close]");
  const startBtn = root.querySelector<HTMLButtonElement>("[data-card-start]");
  const clickBtn = root.querySelector<HTMLButtonElement>("[data-card-click]");
  const countEl = root.querySelector<HTMLElement>("[data-card-count]");

  if (!closeBtn || !startBtn || !clickBtn || !countEl) {
    return;
  }

  root.dataset.bound = "true";
  let count = 0;
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
  };

  startBtn.addEventListener("click", onStart);
  addCleanup(root, () => startBtn.removeEventListener("click", onStart));

  clickBtn.addEventListener("click", onClick);
  addCleanup(root, () => clickBtn.removeEventListener("click", onClick));

  closeBtn.addEventListener("click", onClose);
  addCleanup(root, () => closeBtn.removeEventListener("click", onClose));


  const mutationObserver = new MutationObserver(() => {
    const card = document.querySelector<HTMLElement>("[data-card-root]");
    if (!card || card.classList.contains('hidden')) {
      runAllCleanups(root);
      mutationObserver.disconnect();
    }
  });

  mutationObserver.observe(root, { childList: true, subtree: true })
}
