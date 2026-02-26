type CleanFn = () => void;

export const cleanUpMap = new WeakMap<HTMLElement, CleanFn[]>();

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