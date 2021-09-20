import React from 'react';
import AuthContextProvider from './AuthContext';
import CategoryContextProvider from './CategoryContext';
import ProductContextProvider from './ProductContext';
import ThemeContextProvider from './ThemeContext';
import ProductDetailContextProvider from './ProductDetailContext'
import CartContextProvider from './CartContext';
import UserContextProvider from './UserContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <UserContextProvider>
                    <CategoryContextProvider>
                        <ProductContextProvider>
                            <ProductDetailContextProvider>
                                <CartContextProvider>
                                    {props.children}
                                </CartContextProvider>
                            </ProductDetailContextProvider>
                        </ProductContextProvider>
                    </CategoryContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;