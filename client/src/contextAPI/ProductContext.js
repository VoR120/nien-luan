import React, { createContext, useReducer } from 'react';
import ProductReducer, { initialState } from '../reducer/ProductReducer';

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [product, productDispatch] = useReducer(ProductReducer, initialState)
    return (
        <ProductContext.Provider value={{ product, productDispatch }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;