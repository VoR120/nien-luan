export const initialState = {
    orders: [],
    loading: false,
    error: null
}

const OrderReducer = (state, action) => {
    console.log("Order  action: ",action);
    switch (action.type) {
        case 'GET_ORDER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_ORDER_SUCCESS':
            return {
                ...state,
                orders: action.payload.orders,
                loading: false,
            }
        default:
            return initialState;
    }
}

export default OrderReducer;
