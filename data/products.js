const products = [
    {
        "id": 1,
        "sku": 1101,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL BLANCO",
        "price": 350,
        "image": ""
    },
    {
        "id": 2,
        "sku": 1201,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL BLANCO",
        "price": 875,
        "image": ""
    },
    {
        "id": 3,
        "sku": 1104,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL CON TINTE",
        "price": 425,
        "image": ""
    },
    {
        "id": 4,
        "sku": 1201,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL BLANCO",
        "price": 950,
        "image": ""
    },
    {
        "id": 5,
        "sku": 1102,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL FOTOCROMATICO",
        "price": 1000,
        "image": ""
    },
    {
        "id": 6,
        "sku": 1202,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL FOTOCROMATICO",
        "price": 1275,
        "image": ""
    },
    {
        "id": 7,
        "sku": 1111,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL AR",
        "price": 500,
        "image": ""
    },
    {
        "id": 8,
        "sku": 1211,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL AR",
        "price": 975,
        "image": ""
    },
    {
        "id": 9,
        "sku": 1311,
        "category": "lenses",
        "material": "HI-INDEX 1.67",
        "description": "MONOFOCAL AR",
        "price": 2475,
        "image": ""
    },
    {
        "id": 10,
        "sku": 1314,
        "category": "lenses",
        "material": "HI-INDEX 1.67",
        "description": "MONOFOCAL CON TINTE",
        "price": 2550,
        "image": ""
    },
    {
        "id": 11,
        "sku": 1411,
        "category": "lenses",
        "material": "HI-INDEX 1.74",
        "description": "MONOFOCAL AR",
        "price": 3650,
        "image": ""
    },
    {
        "id": 12,
        "sku": 1414,
        "category": "lenses",
        "material": "HI-INDEX 1.74",
        "description": "MONOFOCAL CON TINTE",
        "price": 3725,
        "image": ""
    },
    {
        "id": 13,
        "sku": 1112,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL FOTOCROMATICO AR",
        "price": 1175,
        "image": ""
    },
    {
        "id": 14,
        "sku": 1212,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL FOTOCROMATICO AR",
        "price": 1475,
        "image": ""
    },
    {
        "id": 15,
        "sku": 1121,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL BLUEBLOCK",
        "price": 750,
        "image": ""
    },
    {
        "id": 16,
        "sku": 1221,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL BLUEBLOCK",
        "price": 1325,
        "image": ""
    },
    {
        "id": 17,
        "sku": 1122,
        "category": "lenses",
        "material": "CR-39",
        "description": "MONOFOCAL FOTOCROMATICO BLUEBLOCK",
        "price": 1300,
        "image": ""
    },
    {
        "id": 18,
        "sku": 1222,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "MONOFOCAL FOTOCROMATICO BLUEBLOCK",
        "price": 1600,
        "image": ""
    },
    {
        "id": 19,
        "sku": 2101,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL BLANCO",
        "price": 475,
        "image": ""
    },
    {
        "id": 20,
        "sku": 2201,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL BLANCO",
        "price": 825,
        "image": ""
    },
    {
        "id": 21,
        "sku": 2104,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL CON TINTE",
        "price": 550,
        "image": ""
    },
    {
        "id": 22,
        "sku": 2204,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL CON TINTE",
        "price": 900,
        "image": ""
    },
    {
        "id": 23,
        "sku": 2102,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL FOTOCROMATICO",
        "price": 1275,
        "image": ""
    },
    {
        "id": 24,
        "sku": 2202,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL FOTOCROMATICO",
        "price": 1475,
        "image": ""
    },
    {
        "id": 25,
        "sku": 2111,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL AR",
        "price": 775,
        "image": ""
    },
    {
        "id": 26,
        "sku": 2211,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL AR",
        "price": 1000,
        "image": ""
    },
    {
        "id": 27,
        "sku": 2121,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL BLUEBLOCK",
        "price": 975,
        "image": ""
    },
    {
        "id": 28,
        "sku": 2221,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL BLUEBLOCK",
        "price": 1275,
        "image": ""
    },
    {
        "id": 29,
        "sku": 2112,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL FOTOCROMATICO AR",
        "price": 1600,
        "image": ""
    },
    {
        "id": 30,
        "sku": 2212,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL FOTOCROMATICO AR",
        "price": 1725,
        "image": ""
    },
    {
        "id": 31,
        "sku": 2122,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL FOTOCROMATICO BLUEBLOCK",
        "price": 0,
        "image": ""
    },
    {
        "id": 32,
        "sku": 2222,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL FOTOCROMATICO BLUEBLOCK",
        "price": 0,
        "image": ""
    },
    {
        "id": 33,
        "sku": 3101,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO BLANCO",
        "price": 975,
        "image": ""
    },
    {
        "id": 34,
        "sku": 3201,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO BLANCO",
        "price": 1475,
        "image": ""
    },
    {
        "id": 35,
        "sku": 3104,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO CON TINTE",
        "price": 1050,
        "image": ""
    },
    {
        "id": 36,
        "sku": 3204,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO BLANCO",
        "price": 1555,
        "image": ""
    },
    {
        "id": 37,
        "sku": 3102,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO FOTOCROMATICO",
        "price": 1800,
        "image": ""
    },
    {
        "id": 38,
        "sku": 3202,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO FOTOCROMATICO",
        "price": 2075,
        "image": ""
    },
    {
        "id": 39,
        "sku": 3111,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO AR",
        "price": 1225,
        "image": ""
    },
    {
        "id": 40,
        "sku": 3211,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO AR",
        "price": 1675,
        "image": ""
    },
    {
        "id": 41,
        "sku": 3121,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO BLUEBLOCK",
        "price": 1675,
        "image": ""
    },
    {
        "id": 42,
        "sku": 3221,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO BLUEBLOCK",
        "price": 1825,
        "image": ""
    },
    {
        "id": 43,
        "sku": 3112,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO FOTOCROMATICO AR",
        "price": 2075,
        "image": ""
    },
    {
        "id": 44,
        "sku": 3212,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO FOTOCROMATICO AR",
        "price": 2325,
        "image": ""
    },
    {
        "id": 45,
        "sku": 3122,
        "category": "lenses",
        "material": "CR-39",
        "description": "PROGRESIVO FOTOCROMATICO BLUEBLOCK",
        "price": 2300,
        "image": ""
    },
    {
        "id": 46,
        "sku": 3222,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "PROGRESIVO FOTOCROMATICO BLUEBLOCK",
        "price": 2550,
        "image": ""
    },
    {
        "id": 47,
        "sku": 4101,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE BLANCO",
        "price": 0,
        "image": ""
    },
    {
        "id": 48,
        "sku": 4201,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE BLANCO",
        "price": 0,
        "image": ""
    },
    {
        "id": 49,
        "sku": 4104,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE CON TINTE",
        "price": 0,
        "image": ""
    },
    {
        "id": 50,
        "sku": 4204,
        "category": "lenses",
        "material": "HI-IONDEX",
        "description": "BIFOCAL INVISIBLE CON TINTE",
        "price": 0,
        "image": ""
    },
    {
        "id": 51,
        "sku": 4102,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO",
        "price": 0,
        "image": ""
    },
    {
        "id": 52,
        "sku": 4202,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO",
        "price": 0,
        "image": ""
    },
    {
        "id": 53,
        "sku": 4111,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE AR",
        "price": 875,
        "image": ""
    },
    {
        "id": 54,
        "sku": 4211,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE AR",
        "price": 0,
        "image": ""
    },
    {
        "id": 55,
        "sku": 4121,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE BLUEBLOCK",
        "price": 0,
        "image": ""
    },
    {
        "id": 56,
        "sku": 4221,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE BLUEBLOCK",
        "price": 0,
        "image": ""
    },
    {
        "id": 57,
        "sku": 4112,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO AR",
        "price": 1750,
        "image": ""
    },
    {
        "id": 58,
        "sku": 4212,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO AR",
        "price": 2000,
        "image": ""
    },
    {
        "id": 59,
        "sku": 4122,
        "category": "lenses",
        "material": "CR-39",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO BLUEBLOCK",
        "price": 0,
        "image": ""
    },
    {
        "id": 60,
        "sku": 4222,
        "category": "lenses",
        "material": "HI-INDEX",
        "description": "BIFOCAL INVISIBLE FOTOCROMATICO BLUEBLOCK",
        "price": 0,
        "image": ""
    }
];

export default products;