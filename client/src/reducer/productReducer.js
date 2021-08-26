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
        case 'UPDATE_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'UPDATE_PRODUCT_SUCCESS':
            const { productImages, category, name, _id } = action.payload.product
            console.log(action.payload.product);
            let productState = [...state.products];
            const index = productState.findIndex(p => p._id === _id);
            productState[index] = { ...productState[index], name, category, productImages }
            return {
                ...state,
                products: productState,
                loading: false,
            }
        case 'DELETE_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload._id),
                loading: false,
            }
        default:
            return initialState;
    }
}

export default ProductReducer;