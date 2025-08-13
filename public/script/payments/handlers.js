import { 
    getState, 
    updateState 
} from "./state.js";

export const handlerPaymentCloseIcon = ({ DOM }) => {
    updateState(() => {
        return {
            dataPayment: [],
        };
    });

    if (DOM) DOM.remove();
};