export const initialState = {
    product: null,
    loading: false,
    error: null
}

const ProductDetailReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'GET_PRODUCT_DETAIL_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'GET_PRODUCT_DETAIL_SUCCESS':
            return {
                ...state,
                product: action.payload.product,
                loading: false
            }
        case 'DELETE_PRODUCT_DETAIL_SUCCESS':
            return {
                ...initialState
            }
        default:
            return initialState;
    }
}

export default ProductDetailReducer;