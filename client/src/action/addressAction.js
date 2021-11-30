import axios from '../helper/axios';

export const getAddress = async (dispatch) => {
    try {
        dispatch({ type: 'GET_USER_ADDRESS_REQUEST' });
        let config = {
            method: 'GET',
            url: 'api/user/address/get',
        }
        const res = await axios(config);
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: 'GET_USER_ADDRESS_SUCCESS',
                payload: { address: res.data.address }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const addAddress = async (dispatch, payload) => {
    console.log(payload);
    try {
        dispatch({ type: 'ADD_USER_ADDRESS_REQUEST' });
        let config = {
            method: 'POST',
            url: 'api/user/address/create',
            data: payload
        }
        const res = await axios(config);
        if (res.status === 201) {
            dispatch({
                type: 'ADD_USER_ADDRESS_SUCCESS',
                payload: { address: res.data.address.address }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const clearAddress = async (dispatch) => {
    try {
        // dispatch('CLEAR_ADDRESS_REQUEST');
        dispatch('CLEAR_ADDRESS_SUCCESS');
    } catch (error) {
        console.log(error.response.data);
    }
}

export const removeAddress = async (dispatch, id) => {
    try {
        dispatch({ type: 'DELETE_USER_ADDRESS_REQUEST' });
        const res = await axios.put('/api/user/address/', { id });
        if (res.status == 200) {
            dispatch({
                type: 'DELETE_USER_ADDRESS_SUCCESS',
                payload: { address: res.data.address.address }
            })
        }
    } catch (error) {
        console.log(error.response.data);
    }
}