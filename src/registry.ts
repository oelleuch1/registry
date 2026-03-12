// { elementHtml, instances and initFn }

class ComponentRegistry {

}

export const registry = new ComponentRegistry();

// main
// registry.register('.card', initCard)
// registry.register('.navigation', initNavigation)
// registry.register('.menu', initMenu)


// register.start() (start all init functions)
// register.observe() (if the component is not visible or out of the dom, run all cleanups for it)
//