const Class = {
    main: { 
        overlay: '.overlay'
    },
    form: {
        sales: '.formSales',
        clients: '.formSearchClient'
    },
    input: {
        article: '.container--inputArticule',
        discount: '.inputDiscount',
        client: '.inputClient',                 // input del contenedor de busqueda de cliente
        name: '.container--clientName',         // input del contenedor princiapl
        typeOfDiscount: 'value-1',
        payment: '.input_field'                 // input del abono de la venta
    },
    list: {
        products: '.container--shoppingArticles',
        clients: '.listClients',
        items: '.items'
    },
    label: {
        total: '.container--totalPrice',
        subTotal: '.subtotalValue span',
        iva: '.ivaValue span',
        discount: '.discountValue span',
        percent: '.amount--percentIVA',
        totalTicket: '.total',              // Total de la nota
        payment: '.price',                  // Saldo actual de la nota
        titleCard: '.titleCard'
    }
};

export default Class;