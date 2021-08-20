import axios from "../helper/axios";

export const getAllProduct = async (dispatch) => {
    dispatch({ type: 'GET_ALL_PRODUCT_REQUEST' });
    let config = {
        method: 'GET',
        url: '/api/product/get',
    }
    const res = await axios(config);
    console.log(res);

    if(res.status === 200) {
        dispatch({
            type: 'GET_ALL_PRODUCT_SUCCESS',
            payload: {
                products: res.data.product_db
            }
        })
    } else {
        dispatch({
            type: 'GET_ALL_PRODUCT_FAILED',
            payload: {
                error: res.data.error
            }
        })
    }
}
