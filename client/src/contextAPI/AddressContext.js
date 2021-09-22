import React, { createContext, useContext, useReducer } from 'react';
import AddressReducer, { initialState } from '../reducer/AddressReducer';

export const AddressContext = createContext();

const AddressContextProvider = (props) => {
    const [address, addressDispatch] = useReducer(AddressReducer, initialState)
    return (
        <AddressContext.Provider value={{ address, addressDispatch }}>
            {props.children}
        </AddressContext.Provider>
    );
};

export default AddressContextProvider;