import aaxios from "../helper/adminAxios"

export const getAllCustomer = async () => {
    try {
        const res = await aaxios.get('/api/customer/get')
        console.log(res);
        if (res.status == 200) {
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}