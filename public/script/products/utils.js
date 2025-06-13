import { getDataProductDB } from "./getData.js";

export const existSKU = async (SKU) => {
    const data = await getDataProductDB(SKU);
    
    if (data.length > 0)
        return true;

    return false;
};