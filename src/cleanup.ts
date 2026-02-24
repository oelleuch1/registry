type CleanFn = () => void;

export const cleanUpMap = new WeakMap<HTMLElement, CleanFn[]>();
const observerMap = new WeakMap<HTMLElement, MutationObserver>();

export function addCleanup(root: HTMLElement, cleanFn: CleanFn): void {
  let cleanFns = cleanUpMap.get(root);

  if (!cleanFns) {
    cleanFns = [];
    cleanUpMap.set(root, cleanFns);
  }

  cleanFns.push(cleanFn);
}

export function runAllCleanups(root: HTMLElement): void {
  const cleanFns = cleanUpMap.get(root) ?? [];
  for (const cleanFn of cleanFns) {
    cleanFn();
  }
  cleanFns.length = 0;
  cleanUpMap.delete(root);
}

export function watchCleanupOnDetachOrHidden(root: HTMLElement): void {
  if (observerMap.has(root)) {
    return;
  }

  const observer = new MutationObserver(() => {
    const isDetached = !document.body.contains(root);
    const isHidden = root.classList.contains("hidden");

    if (!isDetached && !isHidden) {
      return;
    }

    runAllCleanups(root);
    observer.disconnect();
    observerMap.delete(root);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  observerMap.set(root, observer);

  addCleanup(root, () => {
    observer.disconnect();
    observerMap.delete(root);
  });
}
