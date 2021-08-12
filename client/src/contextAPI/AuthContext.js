import React, { createContext, useReducer } from 'react';
import AuthReducer, { initialState } from '../reducer/AuthReducer';

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