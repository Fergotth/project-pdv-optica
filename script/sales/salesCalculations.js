export const getIVA = (item, IVA) => {
    return parseFloat((item.quantity * item.price - item.discount) * (IVA / 100));
};

export const getAmount = (item) => {
    return (item.quantity * item.price) - item.discount + item.iva;
};