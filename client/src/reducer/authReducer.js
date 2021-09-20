let user = localStorage.getItem('a_user') ? JSON.parse(localStorage.getItem('a_user')) : '';
let token = localStorage.getItem('a_token') ? JSON.parse(localStorage.getItem('a_token')) : '';

export const initialState = {
    isAuthenticated: false,
    userDetails: user,
    token: token,
    loading: false,
    error: null,
    message: null,
}

const AuthReducer = (state, action) => {
    console.log("Action: ", action);
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                userDetails: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
                message: null,
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.error.type,
                message: action.error.msg
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userDetails: '',
                token: ''
            }
        case 'REGISTER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                error: null,
                message: action.payload,
                loading: false,
            }
        case 'REGISTER_FAILED':
            return {
                ...state,
                error: action.payload.error.type ,
                message: action.payload.error.msg,
                loading: false,
            }
        default: {
            return state;
        }
    }
};

export default AuthReducer;