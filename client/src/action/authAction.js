import { useHistory } from 'react-router-dom';
import axios from '../helper/axios';

export const adminLogin = async (dispatch, payload) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        const res = await axios.post('/user/login', payload);
        console.log("Data: ", res); // msg, user, token
        if (res.status === 200) {
            const { token, user } = res.data
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            return res.data;
        }
    } catch (error) {
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

export const adminLogout = async (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}