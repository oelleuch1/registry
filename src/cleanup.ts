type CleanFn = () => void;

/**
const map = new Map<object, number>();
let banana = { name: 'Test' }
map.set(banana, 2)

// map: { banana: 2  }

banana = null;
 **/


// weakMap = { span: [cleanUp1, cleanUp2]  }

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
  weakMap.delete(root);
}

















const weakMap = new Map<string, CleanFn[]>;

const addCleanFn = (key: string, cleanups: CleanFn)=> {
  const cleanUpsFns = weakMap.get(key);

  if (cleanUpsFns) {
    cleanUpsFns.push(cleanups);
    weakMap.set(key, cleanUpsFns);
  } else {
    weakMap.set(key, [cleanups]);
  }
}

const runAllCleanupFns = (key: string) => {
  const cleanFns = weakMap.get(key) ?? [];
  cleanFns.forEach(cleanFn => cleanFn());
  weakMap.delete(key);
}

console.log({ weakMap })


addCleanFn("1", () => console.log('Hello from key 1'))
addCleanFn("1", () => console.log('Hello from key 1, exec 2'))

runAllCleanupFns("1")
