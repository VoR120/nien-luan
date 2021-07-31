import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import AuthReducer, { initialState } from '../reducer/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;