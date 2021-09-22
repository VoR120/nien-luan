import React, { createContext, useReducer } from 'react';
import OrderReducer, { initialState } from '../reducer/OrderReducer';

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
    const [order, orderDispatch] = useReducer(OrderReducer, initialState)
    return (
        <OrderContext.Provider value={{ order, orderDispatch }}>
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;