import React, { createContext, useContext } from 'react';
import AuthReducer from '../reducer/authReducer';
import AuthContextProvider from './AuthContext';
import CategoryContextProvider from './CategoryContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <CategoryContextProvider>
                    {props.children}
                </CategoryContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;