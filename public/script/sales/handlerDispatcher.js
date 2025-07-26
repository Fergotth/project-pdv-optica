import { getElement } from "../utils/getElement.js";
import { total } from "./calculation.js";
import Class from "./consts.js";
import { getState } from "./state.js";

/**
 * Definiciones de los valores a pasar a las funciones a llamar 
 */
export const getHandlerArgs = {
    handlerBtnFrames: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'frames'
    }),

    handlerBtnGlasses: () => ({
        DOM: getElement(Class.list.productsInDB),
    }),

    handlerBtnAccesories: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'accessories'
    }),

    handlerBtnServices: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'services'
    }),

    handlerBtnSinglevision: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'monofocal'
    }),

    handlerBtnBifocal: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'bifocal'
    }),

    handlerBtnProgresive: () => ({
        DOM: getElement(Class.list.productsInDB),
        url: '/get-products',
        category: 'progresivo'
    }),

    handlerItemSelected: (button) => ({
        DOM: getElement(Class.list.itemsInCart),
        sku: button.dataset.sku
    }),

    handlerDeleteItem: (button) => ({
        DOM: button.parentElement
    }),

    handlerPlusButton: (button) => ({
        DOM: button.closest('.item-button')?.querySelector(Class.label.quantity),
        param: 'plus'
    }),

    handlerMinusButton: (button) => ({
        DOM: button.closest('.item-button')?.querySelector(Class.label.quantity),
        param: 'minus'
    }),

    handlerDeleteCart: () => ({
        DOM: getElement(Class.list.itemsInCart),
        param: true
    }),

    handlerSku: () => ({
        DOM: getElement(Class.list.itemsInCart),
        sku: getElement(Class.input.article).value
    }),

    handlerApplyDiscountBtn: () => ({
        DOM: getElement(Class.form.sales),
        items: Number(getElement(Class.label.cartTotalItems).textContent)
    }),

    handlerDeleteDiscountBtn: () => ({}),

    handlerCancelSetDiscountBtn: () => ({
        DOM: getElement('.overlayPromptDiscount')
    }),

    handlerSetDiscountBtn: () => ({
        discount: Number(getElement(Class.input.discount).value)
    }),

    handlerApplyIVA: () => ({}),

    handlerBtnRegisterPay: () => ({
        DOM: getElement(Class.form.sales),
        client: getElement('.input-client').textContent,
        total: total(),
        ID: getElement('.input-client').dataset.id
    }),

    handlerPaymentCloseIcon: () => ({
        DOM: getElement('.overlayPromptDiscount')
    }),

    handlerApplyPayment: () => ({
        DOM: getElement('.salePayments'),
        value: getElement('.paymentValue').value,
        typeOfPayment: getState().typeOfPayment
    }),

    handlerItemDeletePayment: (button) => ({
        DOM: button.closest('.paymentItem'),
        value: Number(button.closest('.paymentItem').querySelector('.paidValue')?.textContent)
    }),

    handlerBtnApplyPayments: () => ({}),

    handlerSearchClient: () => ({
        DOM: getElement(Class.form.sales)
    }),

    handlerSearchClientCloseIcon: () => ({
        DOM: getElement('.overlaySearchClient')
    }),

    handlerBtnSearchClientForm: () => ({
        client: getElement('.input').value,
        DOM: getElement('.listClientContainer')
    }),

    handlerSelectClient: (button) => ({
        client: button.closest('.clientItem').querySelector('.itemFounded').textContent.trim(),
        ID: button.dataset.id,
        DOM: getElement('.input-client')
    }),

    handlerBtnCreateQuotation: () => ({})
};