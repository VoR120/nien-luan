import axios from "../helper/adminAxios";

export const getAllCategory = async (dispatch) => {
    try {
        dispatch({ type: 'GET_ALL_CATEGORY_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/category/get',
        }
        const res = await axios(config);

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
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        dispatch({ type: 'ADD_NEW_CATEGORY_REQUEST' });
        let config = {
            method: 'POST',
            url: '/api/category/add',
            data: data,
        }
        const res = await axios(config);
        console.log("Res: ", res);
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

export const updateCategory = async (dispatch, payload) => {
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        let config = {
            method: 'PUT',
            url: '/api/category/' + data._id,
            data: data,
        }
        const res = await axios(config);
        dispatch({
            type: 'UPDATE_CATEGORY_SUCCESS',
            payload: { category: res.data.category }
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (dispatch, payload) => {
    try {
        let config = {
            method: 'DELETE',
            url: '/api/category/' + payload._id,
        }
        const res = await axios(config);
        console.log(res);
        if (res.status === 200) {

            dispatch({
                type: 'DELETE_CATEGORY_SUCCESS',
                payload: { _id: res.data.data._id }
            })
        }

    } catch (error) {
        console.log(error);
    }
}