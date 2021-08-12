import axios from "../helper/axios";

export const getInitialData = async (categoryDispatch, productDispatch) => {
    try {
        const res = await axios.get('/api/initialData/get');

        if (res.status === 200) {
            categoryDispatch({
                type: 'GET_ALL_CATEGORY_SUCCESS',
                payload: {
                    categories: res.data.category
                }
            })
            productDispatch({
                type: 'GET_ALL_PRODUCT_SUCCESS',
                payload: {
                    products: res.data.product
                }
            })
        } else {
            categoryDispatch({
                type: 'GET_ALL_CATEGORY_FAILED',
                payload: {
                    error: res.data.error
                }
            })
            productDispatch({
                type: 'GET_ALL_PRODUCT_FAILED',
                payload: {
                    error: res.data.error
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}