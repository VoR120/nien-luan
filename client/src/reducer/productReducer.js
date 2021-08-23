export const initialState = {
    products: [],
    loading: false,
    error: null
}

const ProductReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'GET_ALL_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_ALL_PRODUCT_SUCCESS':
            return {
                ...state,
                products: action.payload.products
            };
        case 'GET_ALL_PRODUCT_FAILED':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case 'ADD_NEW_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'ADD_NEW_PRODUCT_SUCCESS':
            return {
                ...state,
                products: [...state.products, action.payload.product],
                loading: false,
            }
        case 'ADD_NEW_PRODUCT_FAILED':
            return {
                ...initialState,
                error: action.payload.error
            }
        default:
            return initialState;
    }
}

export default ProductReducer;