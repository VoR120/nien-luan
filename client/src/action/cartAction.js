import axios from "../helper/axios";

export const getCart = async (dispatch) => {
    try {
        // const user = localStorage.getItem('user');
        // console.log(user);
        dispatch({ type: 'GET_CART_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/cart/get',
        }
        const res = await axios(config);
        console.log("Res cart: ", res.data);
        if (res.status === 200)
            dispatch({ type: 'GET_CART_SUCCESS', payload: { cartItems: res.data.cart_db.cartItems } })
    } catch (error) {
        console.log(error)
    }
}

export const addToCart = async (dispatch, payload) => {
    console.log("Payload card: ", payload);
    try {
        dispatch({ type: 'ADD_TO_CART_REQUEST' });
        const user = localStorage.getItem('user');
        if (user != null) {
            let config = {
                method: 'POST',
                url: '/api/cart/addtocart',
                data: { cartItems: payload.cartItem }
            }
            const res = await axios(config);
            console.log(res);
        }
        dispatch({
            type: 'ADD_TO_CART_SUCCESS',
            payload: {
                cartItem: payload.cartItem
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async (dispatch, payload) => {
    console.log("Payload card: ", payload);
    try {
        dispatch({ type: 'UPDATE_CART_ITEM_REQUEST' });
        const user = localStorage.getItem('user');
        if (user != null) {
            let config = {
                method: 'POST',
                url: '/api/cart/addtocart',
                data: {
                    cartItems:
                    {
                        price: payload.cartItem.priceUpdate,
                        product: payload.cartItem.productUpdate,
                        quantity: payload.cartItem.quantityUpdate,
                    }
                }
            }
            const res = await axios(config);
            console.log(res);
        }
        dispatch({
            type: 'UPDATE_CART_ITEM_SUCCESS',
            payload: {
                cartItem: payload.cartItem
            }
        })
    } catch (error) {

    }
}

export const removeCartItem = async (dispatch, payload) => {
    try {
        dispatch({ type: 'REMOVE_CART_ITEM_REQUEST' });
        const user = localStorage.getItem('user');
        if (user != null) {
            let config = {
                method: 'DELETE',
                url: '/api/cart/' + payload._id,
            }
            const res = await axios(config);
            console.log("Res cart: ", res)
        }
        dispatch({
            type: 'REMOVE_CART_ITEM_SUCCESS',
            payload: {
                _id: payload._id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const clearCart = async (dispatch) => {
    try {
        dispatch({ type: 'CLEAR_CART_REQUEST' });
        const user = localStorage.getItem('user');
        if (user != null) {
            let config = {
                method: 'DELETE',
                url: '/api/cart/destroy',
            }
            const res = await axios(config);
            console.log("Res cart: ", res)
        }
        dispatch({
            type: 'CLEAR_CART_SUCCESS',
        })
    } catch (error) {
        console.log(error)
    }
}