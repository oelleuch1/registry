import { runAllCleanups } from "./cleanup.ts";

type InitComponentFn = (root: HTMLElement) => void;

type RegisteredComponent = {
  selector: string;
  init: InitComponentFn;
};

function findMatchingRoots(node: Node, selector: string): HTMLElement[] {
  if (!(node instanceof Element)) {
    return [];
  }

  const roots: HTMLElement[] = [];
  if (node.matches(selector)) {
    roots.push(node as HTMLElement);
  }

  node
    .querySelectorAll<HTMLElement>(selector)
    .forEach((root) => roots.push(root));

  return roots;
}

class ComponentRegistry {
  private components: RegisteredComponent[] = [];
  private observer: MutationObserver | null = null;
  private started = false;

  register(selector: string, init: InitComponentFn): void {
    this.components.push({ selector, init });
  }

  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;

    for (const component of this.components) {
      document
        .querySelectorAll<HTMLElement>(component.selector)
        .forEach((root) => component.init(root));
    }

    this.observe();
  }

  private observe(): void {
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          for (const component of this.components) {
            findMatchingRoots(node, component.selector).forEach((root) => {
              component.init(root);
            });
          }
        });

        mutation.removedNodes.forEach((node) => {
          for (const component of this.components) {
            findMatchingRoots(node, component.selector).forEach((root) => {
              runAllCleanups(root);
            });
          }
        });
      }
    });

    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  stop(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.started = false;

    for (const component of this.components) {
      document
        .querySelectorAll<HTMLElement>(component.selector)
        .forEach((root) => runAllCleanups(root));
    }
  }
}

export const registry = new ComponentRegistry();
