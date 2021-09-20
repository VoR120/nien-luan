import React, { createContext, useReducer, useState } from 'react';
import ProductDetailReducer, { initialState } from '../reducer/ProductDetailReducer';

export const ProductDetailContext = createContext();

const ProductDetailContextProvider = (props) => {
    const [productDetail, productDetailDispatch] = useReducer(ProductDetailReducer, initialState)
    return (
        <ProductDetailContext.Provider value={{ productDetail, productDetailDispatch }}>
            {props.children}
        </ProductDetailContext.Provider>
    );
};

export default ProductDetailContextProvider;