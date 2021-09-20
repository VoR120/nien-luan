import React, { createContext, useReducer } from 'react';
import UserReducer, { initialState } from '../reducer/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;