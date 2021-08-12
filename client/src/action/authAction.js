import { useHistory } from 'react-router-dom';
import axios from '../helper/axios';

export const adminLogin = async (dispatch, payload) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        let config = {
            method: 'POST',
            url: '/user/login',
            data: payload
        }
        const res = await axios(config);
        console.log("Data: ", res); // msg, user, token
        if (res.status === 200) {
            const { token, user } = res.data
            console.log(res.data);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            return res.data;
        }
    } catch (error) {
        console.log(error.response);
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
};

export const isAdminLogin = (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
        } else {
            dispatch({ type: 'LOGIN_FAILED', payload: { error: 'Failed to login!' } })
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
}

export const adminLogout = async (dispatch, categoryDispatch, productDispatch) => {
    dispatch({ type: 'LOGOUT' });
    categoryDispatch({ type: 'undefined' });
    productDispatch({ type: 'undefined' });
    localStorage.clear();
}