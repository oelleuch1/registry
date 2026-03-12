/** fill the missing code **/

import { runAllCleanups } from "./cleanup";

export function watchCleanupOnDetachOrHidden(root: HTMLElement) {
  const observer = new MutationObserver((mutation) => {
    console.log({ mutation });

    const isHidden = root.classList.contains("hidden");
    const exists = document.contains(root);

    if (isHidden || !exists) {
      runAllCleanups(root);
      console.log("Card is hidden. Cleaning up...");
    }
  });

  observer.observe(root, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
