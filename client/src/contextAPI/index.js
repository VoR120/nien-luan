import React from 'react';
import AuthContextProvider from './AuthContext';
import CategoryContextProvider from './CategoryContext';
import ProductContextProvider from './ProductContext';
import ThemeContextProvider from './ThemeContext';
import ProductDetailContextProvider from './ProductDetailContext'
import CartContextProvider from './CartContext';
import UserContextProvider from './UserContext';
import AddressContextProvider from './AddressContext';
import OrderContextProvider from './OrderContext';
import OrderAdminContextProvider from './OrderAdminContext';
import SnackbarContextProvider from './SnackbarContext';

const AppContextProvider = (props) => {
    return (
        <ThemeContextProvider>
            <SnackbarContextProvider>
                <AuthContextProvider>
                    <UserContextProvider>
                        <CategoryContextProvider>
                            <ProductContextProvider>
                                <ProductDetailContextProvider>
                                    <CartContextProvider>
                                        <AddressContextProvider>
                                            <OrderContextProvider>
                                                <OrderAdminContextProvider>
                                                    {props.children}
                                                </OrderAdminContextProvider>
                                            </OrderContextProvider>
                                        </AddressContextProvider>
                                    </CartContextProvider>
                                </ProductDetailContextProvider>
                            </ProductContextProvider>
                        </CategoryContextProvider>
                    </UserContextProvider>
                </AuthContextProvider>
            </SnackbarContextProvider>
        </ThemeContextProvider>
    );
};

export default AppContextProvider;