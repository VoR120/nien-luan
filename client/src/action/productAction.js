import axios from "../helper/axios";

export const getAllProduct = async (dispatch) => {
    dispatch({ type: 'GET_ALL_PRODUCT_REQUEST' });
    let config = {
        method: 'GET',
        url: '/api/product/get',
    }
    const res = await axios(config);
    console.log(res);

    if (res.status === 200) {
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

export const addProduct = async (dispatch, payload) => {
    try {
        dispatch({ type: 'ADD_NEW_PRODUCT_REQUEST' });
        let config = {
            method: 'POST',
            url: '/api/product/add',
            data: payload,
        }
        const res = await axios(config);
        console.log("Res: ", res);
        if (res.status === 201) {
            dispatch({
                type: 'ADD_NEW_PRODUCT_SUCCESS',
                payload: { product: res.data.product }
            });
        }
    } catch (error) {
        dispatch({
            type: 'ADD_NEW_PRODUCT_FAILED',
            payload: {
                error: error.response.data
            }
        })
    }
}