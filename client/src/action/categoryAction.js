import axios from "../helper/axios";

export const getAllCategory = async (dispatch) => {
    try {
        dispatch({ type: 'GET_ALL_CATEGORY_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/category/get',
        }
        const res = await axios(config);
        console.log(res);

        if (res.status === 200) {
            dispatch({
                type: 'GET_ALL_CATEGORY_SUCCESS',
                payload: {
                    categories: res.data.category_db
                }
            })
        }
    } catch (error) {
        dispatch({
            type: 'GET_ALL_CATEGORY_FAILED',
            payload: {
                error: error.response.data
            }
        })
    }
}

export const addCategory = async (dispatch, payload) => {
    try {
        dispatch({ type: 'ADD_NEW_CATEGORY_REQUEST'});
        let config = {
            method: 'POST',
            url: '/api/category/add',
            data: payload,
        }
        const res = await axios(config);
        if (res.status === 201) {
            dispatch({
                type: 'ADD_NEW_CATEGORY_SUCCESS',
                payload: { category: res.data.category }
            });
        }
    } catch (error) {
        dispatch({
            type: 'ADD_NEW_CATEGORY_FAILED',
            payload: {
                error: error.response.data
            }
        })
    }
}