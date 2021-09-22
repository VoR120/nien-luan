const cartLS = JSON.parse(localStorage.getItem('cart'));

export const initialState = {
    cartObj: cartLS || [],
    loading: false,
    error: null
}

const CartReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'GET_CART_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_CART_SUCCESS':
            return {
                ...state,
                cartObj: action.payload.cartItems,
                loading: false,
            }
        case 'ADD_TO_CART_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ADD_TO_CART_SUCCESS':
            let cartState = [...state.cartObj];
            const { product, quantity, price } = action.payload.cartItem;
            if (cartState.length === 0) {
                cartState.push({ product, quantity, price });
            } else {
                let index = cartState.findIndex(c => c.product._id === product._id);
                if (index > -1) {
                    cartState[index] = {
                        ...cartState[index],
                        quantity: cartState[index].quantity + Number(quantity),
                        price: cartState[index].price + price
                    }
                } else {
                    cartState.push({ product, quantity, price });
                }
            }
            // localStorage.setItem("cart", JSON.stringify(cartState));
            return {
                ...state,
                cartObj: cartState,
                loading: false
            }
        case 'UPDATE_CART_ITEM_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'UPDATE_CART_ITEM_SUCCESS':
            const { cartItem } = action.payload;
            let cartStateUpdate = [...state.cartObj];
            let index = cartStateUpdate.findIndex(c => c.product._id === cartItem.productUpdate._id);
            if (index > -1) {
                cartStateUpdate[index] = {
                    ...cartStateUpdate[index],
                    quantity: cartItem.quantityUpdate,
                    price: cartItem.priceUpdate,
                }
            }
            // localStorage.setItem("cart", JSON.stringify(cartStateUpdate));
            return {
                ...state,
                cartObj: cartStateUpdate,
                loading: false,
            }
        case 'REMOVE_CART_ITEM_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'REMOVE_CART_ITEM_SUCCESS':
            // localStorage.setItem("cart", JSON.stringify(state.cartObj.filter(item => item.product._id !== action.payload._id)));
            return {
                ...state,
                loading: false,
                cartObj: state.cartObj.filter(item => item.product._id !== action.payload._id),
            }
        case 'CLEAR_CART_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'CLEAR_CART_SUCCESS':
            // localStorage.removeItem("cart")
            return {
                cartObj: [],
                loading: false,
                error: null
            }
        default:
            return initialState;
    }
}

export default CartReducer;