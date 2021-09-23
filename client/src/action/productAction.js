import axios from "../helper/axios";
import aaxios from "../helper/adminAxios";

export const getAllProduct = async (dispatch) => {
    dispatch({ type: 'GET_ALL_PRODUCT_REQUEST' });
    let config = {
        method: 'GET',
        url: '/api/product/get',
    }
    const res = await axios(config);
    console.log(res);

    if (res.status === 200) {
        dispatch({
            type: 'GET_ALL_PRODUCT_SUCCESS',
            payload: {
                products: res.data.product_db
            }
        })
    } else {
        dispatch({
            type: 'GET_ALL_PRODUCT_FAILED',
            payload: {
                error: res.data.error
            }
        })
    }
}

export const getProduct = async (dispatch, payload) => {

    console.log("payload: ", payload);
    let filterArr = [];
    payload.filterArr.forEach(el => {
        for (let key in el) {
            if (el[key] != null) {
                filterArr.push(el);
            }
        }
    })
    console.log(filterArr);
    let paramFilter = ""
    if (filterArr.length > 0) {
        filterArr.forEach(el => {
            for (let key in el) {
                if (key == 'price') {
                    switch (el[key]) {
                        case 'lt1':
                            el[key] = 'price[lt]=100001'
                            break;
                        case '1to2':
                            el[key] = 'price[gt]=100000&price[lt]=200001'
                            break;
                        case '2to5':
                            el[key] = 'price[gt]=200000&price[lt]=500001'
                            break;
                        case '5to10':
                            el[key] = 'price[gt]=500000&price[lt]=1000001'
                            break;
                        case 'gt10':
                            el[key] = 'price[gt]=1000000'
                            break;
                        default:
                            break;
                    }
                    paramFilter += `${el[key]}&`
                } else
                    paramFilter += `${key}=${el[key]}&`
            }
        })
    }

    const param = paramFilter.slice(0, paramFilter.length - 1);
    try {
        dispatch({ type: 'GET_PRODUCT_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/product/get?' + param,
        }
        const res = await axios(config);
        if (res.status === 200) {
            dispatch({
                type: 'GET_PRODUCT_SUCCESS',
                payload: { products: res.data.product_db }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProductDetail = async (dispatch, payload) => {
    try {
        dispatch({ type: 'GET_PRODUCT_DETAIL_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/product/' + payload.slug,
        }
        const res = await axios(config);
        if (res.status === 200) {
            dispatch({
                type: 'GET_PRODUCT_DETAIL_SUCCESS',
                payload: {
                    product: res.data.product
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProductRelate = async (dispatch, payload) => {
    try {
        dispatch({ type: 'GET_PRODUCT_RELATE_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/product/get?category=' + payload.data.slug,
        }
        const res = await axios(config);
        const products = res.data.product_db.filter(p => p._id != payload.data._id)
        dispatch({
            type: 'GET_PRODUCT_RELATE_SUCCESS',
            payload: { products }
        });

    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (dispatch, payload) => {
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        dispatch({ type: 'ADD_NEW_PRODUCT_REQUEST' });
        let config = {
            method: 'POST',
            url: '/api/product/add',
            data: data,
        }
        const res = await aaxios(config);
        console.log("Res: ", res);
        if (res.status === 201) {
            dispatch({
                type: 'ADD_NEW_PRODUCT_SUCCESS',
                payload: { product: res.data.product }
            });
        }
    } catch (error) {
        dispatch({
            type: 'ADD_NEW_PRODUCT_FAILED',
            payload: {
                error: error.response.data
            }
        })
    }
}

export const updateProduct = async (dispatch, payload) => {
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        let config = {
            method: 'PUT',
            url: '/api/product/' + data._id,
            data: data,
        }
        const res = await aaxios(config);
        if (res.status === 200)
            dispatch({
                type: 'UPDATE_PRODUCT_SUCCESS',
                payload: { product: res.data.product }
            })
    } catch (error) {
        console.log(error);
    }
}


export const deleteProduct = async (dispatch, payload) => {
    try {
        let config = {
            method: 'DELETE',
            url: '/api/product/' + payload._id,
        }
        const res = await aaxios(config);
        console.log(res);
        if (res.status === 200) {
            const deleteArray = [];
            payload.image.map(img => {
                deleteArray.push(img.public_id);
            })
            const resCloud = await aaxios.post('/api/delete', { public_id: deleteArray });
            console.log(resCloud);
            dispatch({
                type: 'DELETE_PRODUCT_SUCCESS',
                payload: { _id: res.data.data._id }
            })
        }

    } catch (error) {
        console.log(error);
    }
}

export const removeProductDetail = (dispatch) => {
    try {
        dispatch({ type: 'DELETE_PRODUCT_DETAIL_SUCCESS' })
    } catch (error) {
        console.log(error);
    }
}

export const searchProduct = async (payload) => {
    try {
        let config = {
            method: 'GET',
            url: '/api/product/get?slug[regex]=' + payload.key.toLowerCase(),
        }
        const res = await aaxios(config);
        return res.data.product_db
    } catch (error) {

    }
}