import React, { createContext, useContext, useReducer } from 'react';
import { getCart } from '../action/cartAction';
import CartReducer, { initialState } from '../reducer/CartReducer';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cart, cartDispatch] = useReducer(CartReducer, initialState)
    return (
        <CartContext.Provider value={{ cart, cartDispatch }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;