export const safeNumber = (value) => {
    if (value === null || value === undefined) return null;

    const text = String(value).trim();
    if (text === "") return null;

    const num = Number(text);
    return Number.isNaN(num) ? null : num;
};