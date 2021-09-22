export const initialState = {
    address: [],
    error: null,
    loading: false,
}

const AddressReducer = (state, action) => {
    console.log("Address action: ", action);
    switch (action.type) {
        case 'GET_USER_ADDRESS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_USER_ADDRESS_SUCCESS':
            return {
                ...state,
                address: action.payload.address.address,
                loading: false,
            }
        case 'ADD_USER_ADDRESS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'ADD_USER_ADDRESS_SUCCESS':
            return {
                ...state,
                address: action.payload.address,
                loading: false,
            }
        case 'CLEAR_ADDRESS_SUCCESS':
            return {
                initialState
            }
        default:
            break;
    }
}

export default AddressReducer;
