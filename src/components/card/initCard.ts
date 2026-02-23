export function initCard(): void {
  const root = document.querySelector<HTMLElement>("[data-card-root]");

  console.log(root);

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

  startBtn.addEventListener("click", () => {
    window.setInterval(() => {
      count += 1;
      countEl.textContent = String(count);
      console.log("Timer is:", count);
    }, 1000);
  });

  clickBtn.addEventListener("click", () => {
    alert("Button clicked!");
  });

  closeBtn.addEventListener("click", () => {
    root.classList.add("hidden");
  });
}
