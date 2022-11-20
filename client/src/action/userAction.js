import axios from '../helper/axios';

export const userLogin = async (dispatch, payload, open) => {
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
            // open({
            //     type: 'SET_OPEN',
            //     payload: {
            //         msg: "Đã đăng nhập!",
            //         type: "success"
            //     }
            // })
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = token;
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
};

export const userRegister = async (dispatch, payload, open, history) => {
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
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đăng ký thành công!",
                    type: "success"
                }
            })
            history.push('/')
        }
    } catch (error) {
        dispatch({ type: 'REGISTER_FAILED', payload: { error: error.response.data } });
        // open({
        //     type: 'SET_OPEN',
        //     payload: {
        //         msg: "Đã xảy ra lỗi, vui lòng thử lại!",
        //         type: "error"
        //     }
        // })
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
            console.log("No token isLogin")
            // dispatch({ type: 'LOGIN_FAILED', payload: { error: { msg: 'Failed to login!', type: '' } } })
        }
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILED', error: error.response.data });
    }
}

export const userLogout = async (dispatch, open) => {
    dispatch({ type: 'LOGOUT' });
    // open({
    //     type: 'SET_OPEN',
    //     payload: {
    //         msg: "Đã đăng xuất!",
    //         type: "success"
    //     }
    // })
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const ratingUser = async (payload, open) => {
    try {
        await Promise.all(payload.ratings.map(async (el, index) => {
            const res = await axios.post('/user/rating', el)
            console.log(res);
        })).then(() => {
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã đánh giá!",
                    type: "success"
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (payload, open) => {
    const { password, newPassword } = payload
    try {
        const res = await axios.put('/user/changepassword', { password, newPassword })
        if (res.status == 200) {
            return { msg: res.data.msg }
        }
    } catch (error) {
        return { error: error.response.data.msg, type: error.response.data.type }
    }
}