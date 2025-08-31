export const safeNumber = (value) => {
    if (value === null || value === undefined) 
        throw new Error("El valor proporcionado no es un número válido");

    const text = String(value).trim();
    
    if (text === "" || Number.isNaN(Number(text)))
        throw new Error("El valor proporcionado no es un número válido");

    return Number(text);
};