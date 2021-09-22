export const initialState = {
    orders: [],
    loading: false,
    error: null
}

const OrderAdminReducer = (state, action) => {
    console.log("Order admin action: ",action);
    switch (action.type) {
        case 'GET_ALL_ORDER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_ORDER_SUCCESS':
            return {
                ...state,
                orders: action.payload.orders,
                loading: false,
            }
        default:
            return initialState;
    }
}

export default OrderAdminReducer;
