// services/excel.service.js
const XLSX = require("xlsx-js-style");

function updateStock(worksheet, sph, cyl, table) {
    sph = parseFloat(sph);
    cyl = parseFloat(cyl);

    let sphereCol, sphereStartRow, sphereEndRow;
    let cylinderRow, cylinderStartCol, cylinderEndCol;

    let targetRow = null;
    let targetCol = null;

    // 🔎 Buscar ESFERA
    for (let R = table.sphStartRow; R <= table.sphEndRow; R++) {
        const address = XLSX.utils.encode_cell({ r: R, c: table.sphCol });
        const cell = worksheet[address];

        if (cell && parseFloat(cell.v) === sph) {
            targetRow = R;
            break;
        }
    }

    // 🔎 Buscar CILINDRO
    for (let C = table.cylStartCol; C <= table.cylEndCol; C++) {
        const address = XLSX.utils.encode_cell({ r: table.cylRow, c: C });
        const cell = worksheet[address];

        if (cell && parseFloat(cell.v) === cyl) {
            targetCol = C;
            break;
        }
    }

    if (targetRow === null || targetCol === null) {
        console.log("No encontrado:", sph, cyl);
        return null;
    }

    const finalAddress = XLSX.utils.encode_cell({
        r: targetRow,
        c: targetCol
    });

    console.log("Intersección encontrada:", finalAddress);

    worksheet[finalAddress].v =
        (Number(worksheet[finalAddress].v) || 0) - 1;

    return finalAddress;
}

module.exports = { updateStock };
