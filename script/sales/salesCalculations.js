export const getIVA = (item, IVA) => {
    return parseFloat((getSubTotal(item) - item.discount) * (IVA / 100));
};

export const getTotal = (item) => {
    return getSubTotal(item) - item.discount + item.iva;
};

export const getSubTotal = (item) => {
    return item.quantity * item.price;
}