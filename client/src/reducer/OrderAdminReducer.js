export const initialState = {
    orders: [],
    loading: false,
    error: null
}

const OrderAdminReducer = (state, action) => {
    console.log("Order admin action: ", action);
    const orderState = state.orders;
    let newState;
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
        case 'UPDATE_ORDER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'UPDATE_ORDER_SUCCESS':
            const { order } = action.payload
            newState = orderState.map(el => {
                return el._id == order._id ? order : el
            })
            return {
                ...state,
                orders: newState,
                loading: false
            }
        default:
            return initialState;
    }
}

export default OrderAdminReducer;
