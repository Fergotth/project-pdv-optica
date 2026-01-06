import tableLCBaushLomb from "./tablesLC.js";
import { newAlert } from "../utils/alerts.js";

const scriptPrescription = () => {
    const menu = document.querySelector('.left-section--menu'); // contenedor principal del menu
    const selectMenu = document.querySelector('.end--menu'); // menu de tipo de material o LC
    const labelPrescription = document.querySelector('.title--kindOfPrescription'); // label del tipo de prescripcion
    const btnConverter = document.querySelector('.prescription--converter'); // boton convertir rx
    const ODSign = document.querySelector('.data--OD-InputSignSph'); // input del signo de la esfera del OD
    const OSSign = document.querySelector('.data--OS-InputSignSph'); // input del signo de la esfera del OI
    const inputODSph = document.querySelector('.data--OD-InputSph'); // input de esfera OD
    const inputOSSph = document.querySelector('.data--OS-InputSph'); // input de esfera OI
    const ODCylSign = document.querySelector('.data--OD-InputSignCyl'); // input del signo del cilindro
    const OSCylSign = document.querySelector('.data--OS-InputSignCyl'); // input del signo del cilindro
    const inputODCyl = document.querySelector('.data--OD-InputCyl'); // input de cilindro OD
    const inputOSCyl = document.querySelector('.data--OS-InputCyl'); // input de cilindro OI
    const inputODAxis = document.querySelector('.data--OD-InputAxis'); // input de eje OD
    const inputOSAxis = document.querySelector('.data--OS-InputAxis'); // input de eje OI
    const inputODADD = document.querySelector('.data--OD-InputADD'); // input de ADD OD
    const inputOSADD = document.querySelector('.data--OS-InputADD'); // input de ADD OI
    const inputODDNP = document.querySelector('.data--OD-InputDNP'); // input de DNP OD
    const inputOSDNP = document.querySelector('.data--OS-InputDNP'); // input de DNP OI
    const inputODPrism = document.querySelector('.data--OD-InputPrism'); // input de prisma OD
    const inputOSPrism = document.querySelector('.data--OS-InputPrism'); // input de prisma OI
    const inputODBase = document.querySelector('.data--OD-InputBase'); // input de base de prisma OD
    const inputOSBase = document.querySelector('.data--OS-InputBase'); // input de base de prisma OI

    let actualSheet = 'Oftalmica';
    let dataSheet = {
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
    btnConverter.style.opacity = 0;

    // manejador de seleccion del menu lateral
    const clickTarget = (event) => {
        const target = event.target;

        if (["menu--contactGlasses", "menu--glasses"].some(cls => target.classList.contains(cls))) {
            const labelSheet = target.dataset.prescription;
            // corrgir animacion de label
            labelPrescription.style.opacity = 0;
            labelPrescription.textContent = labelSheet; 
            labelPrescription.style.opacity = 1;

            if (actualSheet !== labelSheet) {
                getValuesPrescription(labelSheet !== 'Oftalmica' ? 'frame' : 'lc');
                setValuesPrescription(labelSheet === 'Oftalmica' ? 'frame' : 'lc');
                actualSheet = labelSheet;
            }

            if (target.classList.contains("menu--contactGlasses")) {
                changeVisibility(true);
                btnConverter.style.opacity = 0.8;
            } else {
                changeVisibility(false);
                btnConverter.style.opacity = 0;
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

    // manjeador de teclas prohibidas para los input numericos y cantidad de valores en el input
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

        if (input.value.length > 5) {
            input.value = input.value.slice(0, 5);
        }
    };

    // manjeador para las opciones del menu select
    const changeOption = (event) => {
        const selected = event.target.value;

        switch(selected) {
            case "sv":
                inputODADD.disabled = true;
                inputODADD.style.background = "#00000033";
                inputOSADD.disabled = true;
                inputOSADD.style.background = "#00000033";
                break;
            default:
                inputODADD.disabled = false;
                inputODADD.style.background = "#fff";
                inputOSADD.disabled = false;
                inputOSADD.style.background = "#fff";
                break;
        }
    };

    // convertir RX oftalmica a LC
    const convertRX = () => {
        if (selectMenu.value === "")
            newAlert({
                icon: 'info',
                title: 'Selecciona una opcion',
                text: 'Favor de seleccionar el tipo de lente de contacto a convertir'
        });
        else {
            lcConvertion(dataSheet.frame);

        }
    };

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

    menu.addEventListener('click', clickTarget);
    ODSign.addEventListener('input', keydownSign);
    OSSign.addEventListener('input', keydownSign);
    inputODSph.addEventListener('input', keydownInputNumber);
    inputODSph.addEventListener('keydown', keydownInputNumber);
    inputOSSph.addEventListener('input', keydownInputNumber);
    inputOSSph.addEventListener('keydown', keydownInputNumber);
    inputODCyl.addEventListener('input', keydownInputNumber);
    inputODCyl.addEventListener('keydown', keydownInputNumber);
    ODCylSign.addEventListener('input', keydownSign);
    OSCylSign.addEventListener('input', keydownSign);
    inputOSCyl.addEventListener('input', keydownInputNumber);
    inputOSCyl.addEventListener('keydown', keydownInputNumber);
    inputODAxis.addEventListener('input', keydownInputNumber);
    inputODAxis.addEventListener('keydown', keydownInputNumber);
    inputOSAxis.addEventListener('input', keydownInputNumber);
    inputOSAxis.addEventListener('keydown', keydownInputNumber);
    inputODADD.addEventListener('input', keydownInputNumber);
    inputODADD.addEventListener('keydown', keydownInputNumber);
    inputOSADD.addEventListener('input', keydownInputNumber);
    inputOSADD.addEventListener('keydown', keydownInputNumber);
    inputODDNP.addEventListener('input', keydownInputNumber);
    inputODDNP.addEventListener('keydown', keydownInputNumber);
    inputOSDNP.addEventListener('input', keydownInputNumber);
    inputOSDNP.addEventListener('keydown', keydownInputNumber);
    inputODPrism.addEventListener('input', keydownInputNumber);
    inputODPrism.addEventListener('keydown', keydownInputNumber);
    inputOSPrism.addEventListener('input', keydownInputNumber);
    inputOSPrism.addEventListener('keydown', keydownInputNumber);
    inputODBase.addEventListener('input', keydownInputNumber);
    inputODBase.addEventListener('keydown', keydownInputNumber);
    inputOSBase.addEventListener('input', keydownInputNumber);
    inputOSBase.addEventListener('keydown', keydownInputNumber);
    selectMenu.addEventListener('change', changeOption);
    btnConverter.addEventListener('click', convertRX);

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

        if (!OD && !OS) 
            newAlert({
                icon: 'info',
                title: 'No existe esa RX en Lente de contacto',
                text: 'Favor de verificar los valores ingresados'
            });
        else setValuesConverted('lc', OD, OS);
    };

    const setValuesConverted = (key, OD, OS) => {
        dataSheet[key].ODSignSph = OD.SignSph;
        dataSheet[key].ODSphValue = OD.SphValue;
        dataSheet[key].ODCylSign = OD.SignCyl;
        dataSheet[key].ODCylValue = OD.Cyl;
        dataSheet[key].ODAxisValue = convertAxis(parseInt(dataSheet['frame'].ODAxisValue));
        dataSheet[key].OSSignSph = OS.SignSph;
        dataSheet[key].OSSphValue = OS.SphValue;
        dataSheet[key].OSCylSign = OS.SignCyl;
        dataSheet[key].OSCylValue = OS.Cyl;
        dataSheet[key].OSAxisValue = convertAxis(parseInt(dataSheet['frame'].OSAxisValue));

        setValuesPrescription(key);
    };

    const setValuesPrescription = (key) => {
        ODSign.value = dataSheet[key].ODSignSph;
        inputODSph.value = dataSheet[key].ODSphValue;
        ODCylSign.value = dataSheet[key].ODCylSign;
        inputODCyl.value = dataSheet[key].ODCylValue;
        inputODAxis.value = dataSheet[key].ODAxisValue;
        inputODADD.value = dataSheet[key].ODADDValue;
        inputODPrism.value = dataSheet[key].ODPrismValue;
        inputODBase.value = dataSheet[key].ODPrismBaseValue;
        OSSign.value = dataSheet[key].OSSignSph;
        inputOSSph.value = dataSheet[key].OSSphValue;
        OSCylSign.value = dataSheet[key].OSCylSign;
        inputOSCyl.value = dataSheet[key].OSCylValue;
        inputOSAxis.value = dataSheet[key].OSAxisValue;
        inputOSADD.value = dataSheet[key].OSADDValue;
        inputOSPrism.value = dataSheet[key].OSPrismValue;
        inputOSBase.value = dataSheet[key].OSPrismBaseValue;
    };

    const getValuesPrescription = (key) => {
        dataSheet[key] = {
            ODSignSph: ODSign.value,
            ODSphValue: inputODSph.value,
            ODCylSign: ODCylSign.value,
            ODCylValue: inputODCyl.value,
            ODAxisValue: inputODAxis.value,
            ODADDValue: inputODADD.value,
            ODPrismValue: key === "lc" ? "" : inputODPrism.value,
            ODPrismBaseValue: key === "lc" ? "" : inputODBase.value,
            OSSignSph: OSSign.value,
            OSSphValue: inputOSSph.value,
            OSCylSign: OSCylSign.value,
            OSCylValue: inputOSCyl.value,
            OSAxisValue: inputOSAxis.value,
            OSADDValue: inputOSADD.value,
            OSPrismValue: key === "lc" ? "" : inputOSPrism.value,
            OSPrismBaseValue: key === "lc" ? "" : inputOSBase.value
        };
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

    const changeVisibility = (visibility) => {
        inputODDNP.disabled = visibility;
        inputODDNP.style.background = !visibility ? "#fff" : "#00000033";
        inputODPrism.disabled = visibility;
        inputODPrism.style.background = !visibility ? "#fff" : "#00000033";
        inputODBase.disabled = visibility;
        inputODBase.style.background = !visibility ? "#fff" : "#00000033";
        inputOSDNP.disabled = visibility;
        inputOSDNP.style.background = !visibility ? "#fff" : "#00000033";
        inputOSPrism.disabled = visibility;
        inputOSPrism.style.background = !visibility ? "#fff" : "#00000033";
        inputOSBase.disabled = visibility;
        inputOSBase.style.background = !visibility ? "#fff" : "#00000033";

        selectMenu.replaceChildren();
        selectMenu.innerHTML = changeMenuSelect(!visibility);
    };
};

export default scriptPrescription;