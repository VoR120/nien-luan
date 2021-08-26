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
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        dispatch({ type: 'ADD_NEW_PRODUCT_REQUEST' });
        let config = {
            method: 'POST',
            url: '/api/product/add',
            data: data,
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

export const updateProduct = async (dispatch, payload) => {
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        let config = {
            method: 'PUT',
            url: '/api/product/' + data._id,
            data: data,
        }
        const res = await axios(config);
        if (res.status === 200)
            dispatch({
                type: 'UPDATE_PRODUCT_SUCCESS',
                payload: { product: res.data.product }
            })
    } catch (error) {
        console.log(error);
    }
}


export const deleteProduct = async (dispatch, payload) => {
    try {
        let config = {
            method: 'DELETE',
            url: '/api/product/' + payload._id,
        }
        const res = await axios(config);
        console.log(res);
        if (res.status === 200) {
            const deleteArray = [];
            payload.image.map(img => {
                deleteArray.push(img.public_id);
            })
            const resCloud = await axios.post('/api/delete', { public_id: deleteArray });
            console.log(resCloud);
            dispatch({
                type: 'DELETE_PRODUCT_SUCCESS',
                payload: { _id: res.data.data._id }
            })
        }

    } catch (error) {
        console.log(error);
    }
}