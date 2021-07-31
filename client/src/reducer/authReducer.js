let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
let token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '';

export const initialState = {
    isAuthenticated: false,
    userDetails: user,
    token: token,
    loading: false,
    error: null,
}

const AuthReducer = (state, action) => {
    console.log("Action: ", action);
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                userDetails: action.payload.user,
                token: action.payload.token,
                loading: false,
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.error,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userDetails: '',
                token: ''
            }
        default: {
            return state;
        }
    }
};

export default AuthReducer;