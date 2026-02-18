// services/excel.service.js
function updateStock(worksheet, sph, cyl, table) {
    sph = parseFloat(sph);
    cyl = parseFloat(cyl);

    const {
        sphStartRow,
        sphEndRow,
        sphCol,
        cylRow,
        cylStartCol,
        cylEndCol
    } = table;

    let targetRow = null;
    let targetCol = null;

    // Buscar ESFERA
    for (let R = sphStartRow + 1; R <= sphEndRow + 1; R++) {
        const cell = worksheet.getRow(R).getCell(sphCol + 1);

        if (cell.value !== null && parseFloat(cell.value) === sph) {
            targetRow = R;
            break;
        }
    }

    // Buscar CILINDRO
    for (let C = cylStartCol + 1; C <= cylEndCol + 1; C++) {
        const cell = worksheet.getRow(cylRow + 1).getCell(C);

        if (cell.value !== null && parseFloat(cell.value) === cyl) {
            targetCol = C;
            break;
        }
    }

    if (!targetRow || !targetCol) {
        console.log("No encontrado:", sph, cyl);
        return null;
    }

    console.log("Intersección encontrada:", {
        row: targetRow,
        col: targetCol
    });

    const cell = worksheet.getRow(targetRow).getCell(targetCol);

    cell.value = (Number(cell.value) || 0) - 1;

    return { row: targetRow, col: targetCol };
}

module.exports = { updateStock };