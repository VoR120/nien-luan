import { useHistory } from 'react-router-dom';
import axios from '../helper/axios';

export const adminLogin = async (dispatch, payload) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        let config = {
            method: 'POST',
            url: '/admin/login',
            data: payload
        }
        const res = await axios(config);
        console.log("Data: ", res); // msg, user, token
        if (res.status === 200) {
            const { token, user } = res.data
            console.log(res.data);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            localStorage.setItem('a_token', JSON.stringify(token));
            localStorage.setItem('a_user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = token;
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
};

export const adminRegister = async (dispatch, payload) => {
    payload.role = "admin"
    try {
        dispatch({ type: 'REGISTER_REQUEST' });
        let config = {
            method: 'POST',
            url: '/admin/register',
            data: payload
        }
        const res = await axios(config);
        console.log(res);
        if (res.status === 201) {
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data.msg
            })
        }
    } catch (error) {
        dispatch({ type: 'REGISTER_FAILED', payload: { error: error.response.data } });
    }
}

export const isAdminLogin = (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('a_token'));
        if (token) {
            const user = JSON.parse(localStorage.getItem('a_user'));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            // dispatch({ type: 'LOGIN_FAILED', payload: { error: { msg: 'Failed to login!', type: '' } } })
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
}

export const adminLogout = async (dispatch, categoryDispatch, productDispatch) => {
    dispatch({ type: 'LOGOUT' });
    categoryDispatch({ type: 'undefined' });
    productDispatch({ type: 'undefined' });
    localStorage.removeItem("a_token");
    localStorage.removeItem("a_user");
}
