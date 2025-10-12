import sales from "./sales.js";
import operations from "./operations.js";
import params from "./submenu/paramsSales.js";
import kardexNote from './kardex.js'
import payments from "./payments.js";
import { getElement} from "./utils/getElement.js";
import { showErrorMessage } from "./utils/errorMessage.js";
import { 
    setModuleInstance, 
    setActiveModule 
} from "./utils/globalState.js";

const menu = () => {
    setModuleInstance('sales', { clearEvents: () => {} });
    setModuleInstance('operations', { clearEvents: () => {} });
    setModuleInstance('payments', { clearEvents: () => {} });
    setModuleInstance('kardexNote', { clearEvents: () => {} });
    
    getElement('.containerMenu').addEventListener('click', function(event) {
        const elementClicked = event.target;
        const itemMenu = Array.from(elementClicked.classList).find(item => item.includes('menu--item'));
        
        if (itemMenu) {
            const idItem = itemMenu.match(/item(\d)/);

            //document.querySelectorAll('[class^="menu--item"]').forEach(item => { 
            //    item.style.backgroundColor = "";
            //});

            const itemConfig = {
                1: {
                    borderRadius: '25px 0 0 25px',
                    template: 'template-sales.html',
                    templateId: 1
                },
                2: { 
                    template: 'template-kardexnote.html',
                    templateId: 2 
                },
                3: { 
                    template: 'template-billpayments.html',
                    templateId: 3  
                },
                4: { 
                    template: 'template-params.html',
                    templateId: 4 
                },
                5: { backgroundColor: '#509ec7' },
                6: { 
                    template: 'template-operations.html',
                    templateId: 6 
                },
                7: { backgroundColor: '#509ec7' },
                8: {
                    borderRadius: '0 25px 25px 0'
                }
            };

            const config = itemConfig[idItem[1]];
            
            if (config) {
                if(config.borderRadius) {
                    //elementClicked.style.borderRadius = config.borderRadius;
                }

                if (config.template) {
                    loadTemplate(config.template, config.templateId);
                }
            }
        }

        // if (elementClicked.classList.contains('calendarContainer')) {
        //     const calendarIcon = event.target.closest('.calendarContainer'); // Detecta el SVG clicado

        //     if (calendarIcon) {
        //         const calendar = getElement('calendar');
        //         calendar.classList.toggle('showCalendar'); // Alternar la clase para mostrar u ocultar el calendario
        //     }
        // }
        
        event.stopPropagation();
    });

    const loadTemplate = (templateName, id) => {
        const moduleNameMap = {
            1: 'sales',
            2: 'kardexNote',
            3: 'payments',
            4: 'params',
            6: 'operations'
        };
    
        const moduleName = moduleNameMap[id];
    
        // Llama setActiveModule *antes* de borrar el HTML viejo
        if (moduleName) {
            setActiveModule(moduleName);
        }
    
        fetch(`/templates/${templateName}`)
            .then(response => response.text())
            .then(html => {
                const tempContentDiv = getElement('temporaryContent');
                tempContentDiv.replaceChildren();
                tempContentDiv.innerHTML = html;
    
                switch (id) {
                    case 1:
                        const salesInstance = sales();
                        setModuleInstance(moduleName, salesInstance);
                        break;
                    case 2:
                        const kardexInstance = kardexNote();
                        setModuleInstance(moduleName, kardexInstance);
                        break;
                    case 3:
                        const paymentsInstance = payments();
                        setModuleInstance(moduleName, paymentsInstance);
                        break;
                    case 4:
                        const paramsInstance = params();
                        setModuleInstance(moduleName, paramsInstance);
                        break;
                    case 6:
                        const operationsInstance = operations();
                        setModuleInstance(moduleName, operationsInstance);
                        break;
                }
            })
            .catch(error => {
                showErrorMessage(document.body, `Error al cargar el archivo: ${error}`);
                console.error('Error al cargar el archivo: ', error)
            });
    };
};

export default menu;