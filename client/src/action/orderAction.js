import axios from "../helper/axios";
import aaxios from "../helper/adminAxios";

export const addOrder = async (payload) => {
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

export const getOrder = async (dispatch, payload) => {
    try {
        let config = {
            method: 'GET',
            url: '/api/getOrder/',
        }
        const res = await axios(config);
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrder = async (dispatch, payload) => {
    try {
        dispatch({ type: "GET_ALL_ORDER_REQUEST" });
        let config = {
            method: 'GET',
            url: '/api/getAllOrder/',
        }
        const res = await aaxios(config);
        console.log(res);
        dispatch({
            type: "GET_ALL_ORDER_SUCCESS",
            payload: { orders: res.data.order }
        });
    } catch (error) {
        console.log(error)
    }
}