import React, { createContext, useReducer } from 'react';
import AuthReducer, { initialState } from '../reducer/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [aUser, aDispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ aUser, aDispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;