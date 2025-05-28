/**
 * 
 * Un gestor de estado global para registrar el módulo o función activa.
 */

const globalState = {
    activeModule: null,
    modules: {}
};

/**
   *
   *@param {string} moduleName - El nombre del módulo o función activa
   */
export const setActiveModule = (moduleName) => {
    const currentModule = getActiveModule();

    if (currentModule && currentModule !== moduleName) {
        const instance = globalState.modules[currentModule];

        if (instance && typeof instance.clearEvents === 'function') {
            instance.clearEvents();
        }
    }

    globalState.activeModule = moduleName;
};

/**
   * 
   * @returns {string|null} // Obtiene el módulo o función activa actual.
   */
const getActiveModule = () => {
    return globalState.activeModule;
};

/**
 * 
 * @param {*} moduleName 
 * @param {*} instance 
 */
export const setModuleInstance = (moduleName, instance) => {
    globalState.modules[moduleName] = instance;
};