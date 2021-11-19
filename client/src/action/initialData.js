import axios from "../helper/adminAxios";

const getRate = (ratings) => {
    const quantity = ratings.length;
    const sum = ratings.reduce((a, b) => Number(a) + Number(b.rating), 0);
    const rate = (sum / quantity) || 0
    return { rate, quantity }
}

export const getInitialData = async (categoryDispatch, productDispatch) => {
    try {
        const res = await axios.get('/api/initialData/get')

        if (res.status === 200) {

            let newData = [...res.data.product]
            res.data.product.map((el, index) => {
                newData[index].ratingView = getRate(el.ratings)
            })

            await categoryDispatch({
                type: 'GET_ALL_CATEGORY_SUCCESS',
                payload: {
                    categories: res.data.category
                }
            })
            await productDispatch({
                type: 'GET_ALL_PRODUCT_SUCCESS',
                payload: {
                    products: newData
                }
            })
        } else {
            await categoryDispatch({
                type: 'GET_ALL_CATEGORY_FAILED',
                payload: {
                    error: res.data.error
                }
            })
            await productDispatch({
                type: 'GET_ALL_PRODUCT_FAILED',
                payload: {
                    error: res.data.error
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}