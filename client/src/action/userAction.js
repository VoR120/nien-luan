import { useHistory } from 'react-router-dom';
import axios from '../helper/axios';

export const userLogin = async (dispatch, payload) => {
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
            axios.defaults.headers.common['Authorization'] = token;
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
};

export const userRegister = async (dispatch, payload) => {
    payload.role = "user"
    try {
        dispatch({ type: 'REGISTER_REQUEST' });
        let config = {
            method: 'POST',
            url: '/user/register',
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

export const isUserLogin = (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            // dispatch({ type: 'LOGIN_FAILED', payload: { error: { msg: 'Failed to login!', type: '' } } })
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
}

export const userLogout = async (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
