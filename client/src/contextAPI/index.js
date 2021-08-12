import React, { createContext, useContext } from 'react';
import AuthContextProvider from './AuthContext';
import CategoryContextProvider from './CategoryContext';
import ProductContextProvider from './ProductContext';
import ThemeContextProvider from './ThemeContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <CategoryContextProvider>
                    <ProductContextProvider>
                        {props.children}
                    </ProductContextProvider>
                </CategoryContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;