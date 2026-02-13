/**
 * Estado inical
 */
const initialState = {
    dataFromForm: {},
    dataFromDB: [],
    branchs: {
        'vere': "Optica Vere",
        'total': "Vision Total",
        'laboratorio': "Laboratorio",
        'centro': "Optica del Centro",
        'eco': "Ecovision",
        'all': "Todas las sucursales"
    },
    materials: {
        'svw': "Monofocal Blanco",
        'svar': "Monofocal Antirreflejante",
        'svphar': "Monofocal Fotocromatico Antirreflejante",
        'svbb': "Monofocal Blueblock",
        'svphbb': "Monofocal Fotocromatico Blueblock",
        'ftw': "Bifocal Flat-Top Blanco",
        'ftaw': "Bifocal Flat-Top Antirreflejante",
        'ftphar': "Bifocal Flat-Top Fotocromatico Antirreflejante",
        'prgar': "Progresivo Antirreflejante",
        'prgphar': "Progresivo Fotocromatico Antirreflejante"
    },
    requiredFields: [
        'SphOD', 
        'SphOS', 
        'CylOD', 
        'CylOS', 
        'Material', 
        'Note', 
        'Branch', 
        'DateRegistered'
    ],
    nameFieldMap: {
        SphOD: 'Esfera OD',
        SphOS: 'Esfera OI',
        CylOD: 'Cilindro OD',
        CylOS: 'Cilindro OI',
        AxisOD: 'Eje OD',
        AxisOS: 'Eje OI',
        ADDOD: 'Eje OD',
        ADDOS: 'Eje OI',
        Material: 'Material',
        Note: 'Nota',
        Branch: 'Sucursal',
        DateRegistered: 'Fecha'
    }
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const reducer = (state, action) => {
    switch (action.type) {

        case "SET_FORM_DATA":
            return {
                ...state,
                dataFromForm: action.upload
            };

        case "SET_DB_DATA":
            return {
                ...state,
                dataFromDB: action.upload
            };

        case "CLEAR_TEMP_DATA":
            return {
                ...state,
                dataFromForm:{},
                dataFromDB: []
            };

        default:
            return state;
    }
};

let state = initialState;
let listeners = [];

export const getState = () => {
    return structuredClone(state);
};

export const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
};

export const subscribe = (listener) => {
    listeners.push(listener);

    // Retorna función para desuscribirse
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
};
