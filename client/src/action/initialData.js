import axios from "../helper/axios";

export const getInitialData = async (categoryDispatch, productDispatch) => {
    try {
        const res = await axios.get('/api/initialData/get');

        if (res.status === 200) {
            await categoryDispatch({
                type: 'GET_ALL_CATEGORY_SUCCESS',
                payload: {
                    categories: res.data.category
                }
            })
            await productDispatch({
                type: 'GET_ALL_PRODUCT_SUCCESS',
                payload: {
                    products: res.data.product
                }
            })
        } else {
            await categoryDispatch({
                type: 'GET_ALL_CATEGORY_FAILED',
                payload: {
                    error: res.data.error
                }
            })
            await productDispatch({
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