import axios from "../helper/axios";
import aaxios from "../helper/adminAxios";

export const addOrder = async (payload) => {
    console.log(payload);
    let newItems = payload.items.map(item => {
        let i = { ...item }
        i.productId = item.product._id
        delete i.product
        delete i._id
        return i;
    })
    payload.items = newItems;
    try {
        let config = {
            method: 'POST',
            url: '/api/addOrder',
            data: payload
        }
        const res = await axios(config);
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

export const getOrder = async (dispatch) => {
    try {
        dispatch({ type: "GET_ORDER_REQUEST" });
        let config = {
            method: 'GET',
            url: '/api/getOrder/',
        }
        const res = await axios(config);
        console.log(res);
        dispatch({
            type: "GET_ORDER_SUCCESS",
            payload: { orders: res.data.order }
        });
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrder = async (dispatch) => {
    try {
        dispatch({ type: "GET_ALL_ORDER_REQUEST" });
        let config = {
            method: 'GET',
            url: '/api/getAllOrder/',
        }
        const res = await aaxios(config);
        const result = [...res.data.order];
        await Promise.all((res.data.order.map(async (el, index) => {
            const res = await aaxios.get('/api/user/address/getbyid/' + el.addressId);
                result[index].address = res.data.address[0]
        })))
        console.log(result);
        dispatch({
            type: "GET_ALL_ORDER_SUCCESS",
            payload: { orders: result }
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = async (dispatch, payload) => {
    console.log(payload);
    const { _id, items, orderStatus } = payload
    const type = orderStatus.find(el => !el.isCompleted).type;
    try {
        dispatch({ type: "UPDATE_ORDER_REQUEST" });
        const res = await aaxios.put('/api/updateOrder', { _id, items, type })
        console.log(res);
        if (res.status == 200) {
            dispatch({
                type: "UPDATE_ORDER_SUCCESS",
                payload: {
                    order: res.data.order
                }
            })
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

export const cancelOrder = async (payload, type) => {
    try {
        const res = await axios.put('/api/cancelOrder', { _id: payload.id, type })
        console.log(res);
        if (res.status == 200)
            return res;
    } catch (error) {
        console.log(error.response.data)
    }
}