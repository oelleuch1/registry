/*
MutationObserver is a browser API that watches the DOM for changes after they happen.
You create an observer with a callback, then call observe() on a target node.
The callback receives MutationRecord objects describing what changed.

Mutation types:
- "attributes": an element attribute changed (class, style, data-*, aria-*, etc.)
- "childList": child nodes were added or removed
- "characterData": text node content changed

Common options:
- subtree: true to watch all descendants, not just direct children
- attributeFilter: limit which attributes trigger "attributes" mutations
- attributeOldValue / characterDataOldValue: include previous values in records

Use it when you need to react to DOM changes you don't directly control.

Below are examples tied to this app (navigation + card component).
*/

// Example 1: Watch the card and log when it becomes hidden.
export function exampleWatchCardHidden(): void {
  const card = document.querySelector<HTMLElement>("[data-card-root]");
  if (!card) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    console.log({ mutations });
    if (card.classList.contains("hidden")) {
      console.log("Card is hidden. Cleanups should run now.");
    }
  });

  observer.observe(card, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true,
  });
}

// Example 2: Watch navigation button class changes (page switch).
// export function exampleWatchNavigation(): void {
//   const navButtons = document.querySelectorAll<HTMLButtonElement>("nav button");

//   const observer = new MutationObserver(() => {
//     const navButton = Array.from(navButtons).find((button) =>
//       button.classList.contains("bg-slate-900"),
//     );

//     if (navButton) {
//       console.log("Active page:", navButton.textContent?.trim());
//     }
//   });

//   for (const button of navButtons) {
//     observer.observe(button, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//   }
// }

// Example 3: Track old values for attributes and text changes.
export function exampleTimerWatch(): void {
  const cardCount = document.querySelector<HTMLElement>("[data-card-count]");
  if (!cardCount) {
    return;
  }

  const observer = new MutationObserver(() => {
    console.log("Timer is changed");
  });

  observer.observe(cardCount, {
    characterData: true,
    characterDataOldValue: true,
  });
}

/*
Exercise: Add a small badge element next to the nav title that shows how many times the
   active page changed (increment on each class change).
   */

export function exampleChangeBadge(): void {
  const navButtons = document.querySelectorAll<HTMLButtonElement>("nav button");

  if (!navButtons.length) {
    return;
  }

  let previousActivePage: string = navButtons[0].textContent;

  const observer = new MutationObserver(() => {
    console.log("observer");
    const navButton = Array.from(navButtons).find((button) =>
      button.classList.contains("bg-slate-900"),
    );

    if (navButton) {
      const currentPage = navButton.textContent?.trim() ?? "";
      console.log("currentPage", currentPage);
      console.log("previousActivePage", previousActivePage);

      if (currentPage !== previousActivePage) {
        previousActivePage = currentPage;
        window.dispatchEvent(new CustomEvent("nav-page-changed"));
        console.log("dispatch");
      }
    }
  });

  for (const button of navButtons) {
    observer.observe(button, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

export function runMutationObserverExamples(): void {
  // exampleWatchNavigation();
  exampleWatchCardHidden();
  exampleTimerWatch();
  exampleChangeBadge();
}
