import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
    const [category, setCategory] = useState([
        {
            name: 'Giày',
        },
        {
            name: 'Quần áo'
        }
    ])
    return (
        <CategoryContext.Provider value={{ category }}>
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryContextProvider;