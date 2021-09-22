import React, { createContext, useReducer } from 'react';
import OrderAdminReducer, { initialState } from '../reducer/OrderAdminReducer';

export const OrderAdminContext = createContext();

const OrderAdminContextProvider = (props) => {
    const [orderAdmin, orderAdminDispatch] = useReducer(OrderAdminReducer, initialState)
    return (
        <OrderAdminContext.Provider value={{ orderAdmin, orderAdminDispatch }}>
            {props.children}
        </OrderAdminContext.Provider>
    );
};

export default OrderAdminContextProvider;