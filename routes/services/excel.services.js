// services/excel.service.js
const XLSX = require("xlsx-js-style");

function updateStock(worksheet, sph, cyl, sheet) {
    sph = Number(sph).toFixed(2);
    cyl = Number(cyl).toFixed(2);

    const range = XLSX.utils.decode_range(worksheet['!ref']);

    let targetRow = null;
    let targetCol = null;

    // Buscar fila (esfera)
    for (let R = range.s.r; R <= range.e.r; R++) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: sheet.col }); // Columna B
        const cell = worksheet[cellAddress];

        if (cell && String(cell.v).trim() === sph) {
            targetRow = R;
            break;
        }
    }

    // Buscar columna (cilindro)
    for (let C = range.s.c; C <= range.e.c; C++) {
        const cellAddress = XLSX.utils.encode_cell({ r: sheet.row, c: C }); // Fila 5
        const cell = worksheet[cellAddress];

        if (cell && String(cell.v).trim() === cyl) {
            targetCol = C;
            break;
        }
    }

    if (targetRow === null || targetCol === null) {
        return null;
    }

    const finalAddress = XLSX.utils.encode_cell({
        r: targetRow,
        c: targetCol
    });

    worksheet[finalAddress].v = (Number(worksheet[finalAddress].v) || 0) - 1;

    return finalAddress;
}

module.exports = { updateStock };
