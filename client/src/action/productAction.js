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
        let newData = [...res.data.product_db]
        res.data.product_db.map((el, index) => {
            newData[index].ratingView = getRate(el.ratings)
        })
        dispatch({
            type: 'GET_ALL_PRODUCT_SUCCESS',
            payload: {
                products: newData
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

export const getNewestProduct = async () => {
    try {
        const res = await axios.get('/api/product/get',);
        if (res.status == 200) {
            let newData = [...res.data.product_db]
            res.data.product_db.map((el, index) => {
                newData[index].ratingView = getRate(el.ratings)
            })
            return newData.slice(0, 6)
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const getPopulateProduct = async () => {
    try {
        const res = await axios.get('/api/product/get?sort=-offer',);
        if (res.status == 200) {
            let newData = [...res.data.product_db]
            res.data.product_db.map((el, index) => {
                newData[index].ratingView = getRate(el.ratings)
            })
            return newData.slice(0, 6)
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const getRelateProduct = async (payload) => {
    try {
        const res = await axios.get(`/api/product/get?category=${payload.slug}`);
        console.log(res);
        if (res.status == 200) {
            let newData = [...res.data.product_db]
            res.data.product_db.map((el, index) => {
                newData[index].ratingView = getRate(el.ratings)
            })
            const products = res.data.product_db.filter(p => p._id != payload.id)
            return products
        }
    } catch (error) {
        throw new Error(error);
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
    console.log(param);
    try {
        dispatch({ type: 'GET_PRODUCT_REQUEST' });
        let config = {
            method: 'GET',
            url: '/api/product/get?' + param,
        }
        const res = await axios(config);

        let newData = [...res.data.product_db]
        res.data.product_db.map((el, index) => {
            newData[index].ratingView = getRate(el.ratings)
        })

        if (res.status === 200) {
            dispatch({
                type: 'GET_PRODUCT_SUCCESS',
                payload: { products: newData }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getRate = (ratings) => {
    const quantity = ratings.length;
    const sum = ratings.reduce((a, b) => Number(a) + Number(b.rating), 0);
    const rate = (sum / quantity) || 0
    return { rate, quantity }
}

export const getProductDetail = async (payload) => {
    try {
        let config = {
            method: 'GET',
            url: '/api/product/' + payload,
        }
        const res = await axios(config);

        if (res.status === 200) {
            console.log(res);
            let newData = { ...res.data.product }
            newData.ratingView = getRate(newData.ratings)
            return newData
        }
    } catch (error) {
        console.log(error);
    }
}


export const addProduct = async (dispatch, payload, open) => {
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
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        dispatch({
            type: 'ADD_NEW_PRODUCT_FAILED',
            payload: {
                error: error.response.data
            }
        })
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã xảy ra lỗi!",
                type: "error"
            }
        })
    }
}

export const updateProduct = async (dispatch, payload, open) => {
    let data = {};
    payload.forEach((value, key) => {
        data[key] = value
    })
    try {
        dispatch({  type: 'UPDATE_PRODUCT_REQUEST' })
        let config = {
            method: 'PUT',
            url: '/api/product/' + data._id,
            data: data,
        }
        const res = await aaxios(config);
        if (res.status === 200) {
            dispatch({
                type: 'UPDATE_PRODUCT_SUCCESS',
                payload: { product: res.data.product }
            })
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }
    } catch (error) {
        console.log(error);
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã xảy ra lỗi!",
                type: "error"
            }
        })
    }
}


export const deleteProduct = async (dispatch, payload, open) => {
    try {
        let config = {
            method: 'DELETE',
            url: '/api/product/' + payload._id,
        }
        dispatch({  type: 'DELETE_PRODUCT_REQUEST' })
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
            open({
                type: 'SET_OPEN',
                payload: {
                    msg: "Đã cập nhật!",
                    type: "success"
                }
            })
        }

    } catch (error) {
        console.log(error);
        open({
            type: 'SET_OPEN',
            payload: {
                msg: "Đã xảy ra lỗi!",
                type: "error"
            }
        })
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
        console.log(error);
    }
}