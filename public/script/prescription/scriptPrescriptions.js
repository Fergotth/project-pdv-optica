import tableLCBaushLomb from "./tablesLC.js";
import { newAlert } from "../utils/alerts.js";

// Constantes para colores y clases
const COLORS = {
    enabled: "#fff",
    disabled: "#00000033",
    errorBorder: "1px solid #c00000"
};

const POWER_CLASSES = ["data--OD-InputSph", "data--OS-InputSph", "data--OD-InputCyl", "data--OS-InputCyl", "data--OD-InputADD", "data--OS-InputADD"];
const AXIS_CLASSES = ["data--OD-InputAxis", "data--OS-InputAxis"];

const scriptPrescription = () => {
    /* --- Selectores y elementos del DOM --- */
    const elements = {
        menu: document.querySelector('.left-section--menu'), // contenedor principal del menu
        selectMenu: document.querySelector('.end--menu'), // menu de tipo de material o LC
        labelPrescription: document.querySelector('.title--kindOfPrescription'), // label del tipo de prescripcion
        btnConverter: document.querySelector('.prescription--converter'), // boton convertir rx
        ODSign: document.querySelector('.data--OD-InputSignSph'), // input del signo de la esfera del OD
        OSSign: document.querySelector('.data--OS-InputSignSph'), // input del signo de la esfera del OI
        inputODSph: document.querySelector('.data--OD-InputSph'), // input de esfera OD
        inputOSSph: document.querySelector('.data--OS-InputSph'), // input de esfera OI
        ODCylSign: document.querySelector('.data--OD-InputSignCyl'), // input del signo del cilindro
        OSCylSign: document.querySelector('.data--OS-InputSignCyl'), // input del signo del cilindro
        inputODCyl: document.querySelector('.data--OD-InputCyl'), // input de cilindro OD
        inputOSCyl: document.querySelector('.data--OS-InputCyl'), // input de cilindro OI
        inputODAxis: document.querySelector('.data--OD-InputAxis'), // input de eje OD
        inputOSAxis: document.querySelector('.data--OS-InputAxis'), // input de eje OI
        inputODADD: document.querySelector('.data--OD-InputADD'), // input de ADD OD
        inputOSADD: document.querySelector('.data--OS-InputADD'), // input de ADD OI
        inputODDNP: document.querySelector('.data--OD-InputDNP'), // input de DNP OD
        inputOSDNP: document.querySelector('.data--OS-InputDNP'), // input de DNP OI
        inputODPrism: document.querySelector('.data--OD-InputPrism'), // input de prisma OD
        inputOSPrism: document.querySelector('.data--OS-InputPrism'), // input de prisma OI
        inputODBase: document.querySelector('.data--OD-InputBase'), // input de base de prisma OD
        inputOSBase: document.querySelector('.data--OS-InputBase'), // input de base de prisma OI
        infoFrame: document.querySelector('.prescription--save-prescription'), // boton guardar y generar receta
        infoFrameBtnSave: document.querySelector('.info-frame--btnSave'), // boton registrar
        frameInfoSection: document.querySelector('.p--info-frame') // seccion del frame de info
    };

    /* --- Estado --- */
    let currentPrescriptionType = 'Oftalmica';
    let prescriptionData = {
        frame: {
            ODSignSph: '',
            ODSphValue:'',
            ODCylSign: '-',
            ODCylValue: '',
            ODAxisValue: '',
            ODADDValue: '',
            ODPrismValue: '',
            ODPrismBaseValue: '',
            OSSignSph: '',
            OSSphValue: '',
            OSCylSign: '-',
            OSCylValue: '',
            OSAxisValue: '',
            OSADDValue: '',
            OSPrismValue: '',
            OSPrismBaseValue: ''
        },
        lc: {
            ODSignSph: '',
            ODSphValue:'',
            ODCylSign: '-',
            ODCylValue: '',
            ODAxisValue: '',
            ODADDValue: '',
            ODPrismValue: '',
            ODPrismBaseValue: '',
            OSSignSph: '',
            OSSphValue: '',
            OSCylSign: '-',
            OSCylValue: '',
            OSAxisValue: '',
            OSADDValue: '',
            OSPrismValue: '',
            OSPrismBaseValue: ''
        }
    };

    // boton desahibilitado por default
    elements.btnConverter.style.opacity = 0;

    /* --- Utilidades / Validaciones --- */
    /**
     * Valida si el poder de esfera o cilindro es múltiplo de 0.25.
     * @param {number} power - El valor del poder.
     * @param {HTMLElement} input - El elemento input.
     * @returns {boolean} True si es válido.
     */
    const validatePower = (power, input) => {
        if (POWER_CLASSES.some(cls => input.classList.contains(cls)))
            return Number.isInteger(power * 4);

        return true;
    };

    /**
     * Valida si el eje está entre 0 y 180 y es entero.
     * @param {number} axis - El valor del eje.
     * @param {HTMLElement} input - El elemento input.
     * @returns {boolean} True si es válido.
     */
    const validateAxis = (axis, input) => {
        if (AXIS_CLASSES.some(cls => input.classList.contains(cls)))
            return axis >= 0 && axis <= 180 && Number.isInteger(axis);

        return true;
    };

    /**
     * Convierte el eje a múltiplo de 10, entre 0 y 180.
     * @param {number} axis - El eje original.
     * @returns {number|undefined} El eje convertido o undefined si no es válido.
     */
    const convertAxis = (axis) => {
        if (!!axis) {
            const newAxis = Math.round(axis / 10) * 10;
            return newAxis > 180 || newAxis === 0 ? 180 : newAxis;
        } else {
            newAlert({
                icon: 'info',
                title: 'Eje no definido',
                text: 'Favor de colocar un valor valido en el eje'
            });
            return undefined;
        }
    };

    const changeMenuSelect = (type) => {
        const newOptions = type ? 
        `
        <option value="">Seleccione el tipo de lente</option>
        <option value="sv">Monofocal</option>
        <option value="bf">Bifocal</option>
        <option value="prg">Progresivo</option>
        ` : 
        `
        <option value="">Seleccione el tipo de LC</option>
        <option value="sph">Esferico</option>
        <option value="tor">Torico</option>
        `
        ;

        return newOptions;
    };

    // Función auxiliar para alternar inputs
    const toggleInputs = (inputs, enable) => {
        inputs.forEach(input => {
            input.disabled = !enable;
            input.style.background = enable ? COLORS.enabled : COLORS.disabled;
        });
    };

    const changeVisibility = (visibility) => {
        const prismInputs = [elements.inputODDNP, elements.inputODPrism, elements.inputODBase, elements.inputOSDNP, elements.inputOSPrism, elements.inputOSBase];
        toggleInputs(prismInputs, !visibility);

        elements.selectMenu.replaceChildren();
        elements.selectMenu.innerHTML = changeMenuSelect(!visibility);
    };

    /* --- Lectura / Escritura de valores (get/set) --- */
    const getValuesPrescription = (key) => {
        prescriptionData[key] = {
            ODSignSph: elements.ODSign.value,
            ODSphValue: elements.inputODSph.value,
            ODCylSign: elements.ODCylSign.value,
            ODCylValue: elements.inputODCyl.value,
            ODAxisValue: elements.inputODAxis.value,
            ODADDValue: elements.inputODADD.value,
            ODPrismValue: key === "lc" ? "" : elements.inputODPrism.value,
            ODPrismBaseValue: key === "lc" ? "" : elements.inputODBase.value,
            OSSignSph: elements.OSSign.value,
            OSSphValue: elements.inputOSSph.value,
            OSCylSign: elements.OSCylSign.value,
            OSCylValue: elements.inputOSCyl.value,
            OSAxisValue: elements.inputOSAxis.value,
            OSADDValue: elements.inputOSADD.value,
            OSPrismValue: key === "lc" ? "" : elements.inputOSPrism.value,
            OSPrismBaseValue: key === "lc" ? "" : elements.inputOSBase.value
        };
    };

    const setValuesPrescription = (key) => {
        elements.ODSign.value = prescriptionData[key].ODSignSph;
        elements.inputODSph.value = prescriptionData[key].ODSphValue;
        elements.ODCylSign.value = prescriptionData[key].ODCylSign;
        elements.inputODCyl.value = prescriptionData[key].ODCylValue;
        elements.inputODAxis.value = prescriptionData[key].ODAxisValue;
        elements.inputODADD.value = prescriptionData[key].ODADDValue;
        elements.inputODPrism.value = prescriptionData[key].ODPrismValue;
        elements.inputODBase.value = prescriptionData[key].ODPrismBaseValue;
        elements.OSSign.value = prescriptionData[key].OSSignSph;
        elements.inputOSSph.value = prescriptionData[key].OSSphValue;
        elements.OSCylSign.value = prescriptionData[key].OSCylSign;
        elements.inputOSCyl.value = prescriptionData[key].OSCylValue;
        elements.inputOSAxis.value = prescriptionData[key].OSAxisValue;
        elements.inputOSADD.value = prescriptionData[key].OSADDValue;
        elements.inputOSPrism.value = prescriptionData[key].OSPrismValue;
        elements.inputOSBase.value = prescriptionData[key].OSPrismBaseValue;
    };

    const setValuesConverted = (key, OD, OS) => {
        prescriptionData[key].ODSignSph = OD.SignSph;
        prescriptionData[key].ODSphValue = OD.SphValue;
        prescriptionData[key].ODCylSign = OD.SignCyl;
        prescriptionData[key].ODCylValue = OD.Cyl;
        prescriptionData[key].ODAxisValue = convertAxis(parseInt(prescriptionData['frame'].ODAxisValue));
        prescriptionData[key].OSSignSph = OS.SignSph;
        prescriptionData[key].OSSphValue = OS.SphValue;
        prescriptionData[key].OSCylSign = OS.SignCyl;
        prescriptionData[key].OSCylValue = OS.Cyl;
        prescriptionData[key].OSAxisValue = convertAxis(parseInt(prescriptionData['frame'].OSAxisValue));

        setValuesPrescription(key);
    };

    /* --- Conversión LC --- */
    /**
     * Convierte una prescripción oftálmica a lente de contacto usando la tabla Bausch & Lomb.
     * @param {object} data - Los datos de la prescripción frame.
     */
    const lcConvertion = (data) => {
        const ODSignSph = data.ODSignSph;
        const ODSphValue = data.ODSphValue;
        const ODSignCyl = data.ODCylSign; 
        const ODCylValue = data.ODCylValue;
        const OSSignSph = data.OSSignSph;
        const OSSphValue = data.OSSphValue;
        const OSSignCyl = data.OSCylSign; 
        const OSCylValue = data.OSCylValue;
        let OD = {};
        let OS = {};

        const getValue = (sph, cyl) => {
            for(let row = 0; row < tableLCBaushLomb.length; row++) {
                if (tableLCBaushLomb[row][0] === sph)
                    if (cyl) {
                        for(let col = 0; col < tableLCBaushLomb[0].length; col++) {
                            if (tableLCBaushLomb[0][col] === cyl)
                                return {
                                    SignSph: tableLCBaushLomb[row][1].charAt(0),
                                    SphValue: tableLCBaushLomb[row][1].slice(1),
                                    SignCyl: tableLCBaushLomb[row][col].charAt(0),
                                    Cyl: tableLCBaushLomb[row][col].slice(1)
                                };
                            
                            if (col + 1 === tableLCBaushLomb[0].length)
                                return null;
                        }
                    } else
                        return {
                            SignSph: tableLCBaushLomb[row][1].charAt(0),
                            SphValue: tableLCBaushLomb[row][1].slice(1),
                            SignCyl: "-",
                            Cyl: "0.00"
                        };
            }
            return null;
        }

        OD = getValue(`${ODSignSph}${ODSphValue}`, `${ODSignCyl}${ODCylValue}`);
        OS = getValue(`${OSSignSph}${OSSphValue}`, `${OSSignCyl}${OSCylValue}`);

        if (!OD || !OS) {
            newAlert({
                icon: 'info',
                title: 'No existe esa RX en Lente de contacto',
                text: 'Favor de verificar los valores ingresados'
            });
            return;
        }

        setValuesConverted('lc', OD, OS);
    };

    /* --- Manejadores de eventos --- */
    // manejador de seleccion del menu lateral
    const clickTarget = (event) => {
        const target = event.target;

        if (["menu--contactGlasses", "menu--glasses"].some(cls => target.classList.contains(cls))) {
            const labelSheet = target.dataset.prescription;
            // corrgir animacion de label
            elements.labelPrescription.style.opacity = 0;
            elements.labelPrescription.textContent = labelSheet; 
            elements.labelPrescription.style.opacity = 1;

            if (currentPrescriptionType !== labelSheet) {
                getValuesPrescription(labelSheet !== 'Oftalmica' ? 'frame' : 'lc');
                setValuesPrescription(labelSheet === 'Oftalmica' ? 'frame' : 'lc');
                currentPrescriptionType = labelSheet;
            }

            if (target.classList.contains("menu--contactGlasses")) {
                changeVisibility(true);
                elements.btnConverter.style.opacity = 0.8;
            } else {
                changeVisibility(false);
                elements.btnConverter.style.opacity = 0;
            }
        }
    };

    // manejador del signo + o -  del valor de la esfera
    const keydownSign = (event) => {
        const input = event.target;
        let value = input.value.trim();

        if (value === "") return;
        if (value.length > 1) value = value[0];
        if (!["+", "-"].includes(value)) {
            input.value = "";
            return;
        }
        input.value = value;
    };

    //* manejador de teclas prohibidas para los input numericos y cantidad de valores en el input
    const keydownInputNumber = (event) => {
        const input = event.target;

        if (event.type === "keydown") {
            const key = event.key;
            const blockedKey = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "+", "-"];

            if (blockedKey.includes(key)) {
                event.preventDefault();
                return;
            }
        }

        if (input.value.length > 5)
            input.value = input.value.slice(0, 5);

        const isPowerValid = validatePower(parseFloat(input.value), input);
        const isAxisValid = validateAxis(parseFloat(input.value), input);
        const isValid = isPowerValid && isAxisValid;
    
        input.style.border = !isValid ? COLORS.errorBorder : "none";
    };

    // manejador para las opciones del menu select
    const changeOption = (event) => {
        const selected = event.target.value;

        switch(selected) {
            case "sv":
                toggleInputs([elements.inputODADD, elements.inputOSADD], false);
                break;
            default:
                toggleInputs([elements.inputODADD, elements.inputOSADD], true);
                break;
        }
    };

    // convertir RX oftalmica a LC
    const convertRX = () => {
        if (elements.selectMenu.value === "")
            newAlert({
                icon: 'info',
                title: 'Selecciona una opcion',
                text: 'Favor de seleccionar el tipo de lente de contacto a convertir'
        });
        else {
            lcConvertion(prescriptionData.frame);

        }
    };

    // manejador para mostrar el frame de info
    const showInfoFrame = () => {
        elements.frameInfoSection.style.display = 'flex';
    };

    // manejador para ocultar el frame de info
    const hideInfoFrame = () => {
        elements.frameInfoSection.style.display = 'none';
    };

    /* --- Listeners / Enlaces --- */
    // Listas de inputs para loops
    const signInputs = [elements.ODSign, elements.OSSign, elements.ODCylSign, elements.OSCylSign];
    const numericInputs = [
        elements.inputODSph, elements.inputOSSph, elements.inputODCyl, elements.inputOSCyl,
        elements.inputODAxis, elements.inputOSAxis, elements.inputODADD, elements.inputOSADD,
        elements.inputODDNP, elements.inputOSDNP, elements.inputODPrism, elements.inputOSPrism,
        elements.inputODBase, elements.inputOSBase
    ];

    // Agregar listeners a inputs de signos
    signInputs.forEach(input => input.addEventListener('input', keydownSign));

    // Agregar listeners a inputs numéricos
    numericInputs.forEach(input => {
        input.addEventListener('input', keydownInputNumber);
        input.addEventListener('keydown', keydownInputNumber);
    });

    // Otros listeners
    elements.menu.addEventListener('click', clickTarget);
    elements.selectMenu.addEventListener('change', changeOption);
    elements.btnConverter.addEventListener('click', convertRX);
    elements.infoFrame.addEventListener('click', showInfoFrame);
    elements.infoFrameBtnSave.addEventListener('click', hideInfoFrame);
};

export default scriptPrescription;