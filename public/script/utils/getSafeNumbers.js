export const safeNumber = (value) => {
    if (value === null || value === undefined) 
        throw new Error(`El valor "${value}" no es un número válido`);

    const text = String(value).trim();
    if (text === "") throw new Error(`El valor "${value}" no es un número válido`);

    const num = Number(text);
    if (Number.isNaN(num)) 
        throw new Error(`El valor "${value}" no es un número válido`);

    return num;
};