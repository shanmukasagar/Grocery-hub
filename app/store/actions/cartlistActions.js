import axios from 'axios';
import { cartlistActions, addCartItemActions, deleteCartItemActions, deleteCartActions} from "./actions";

/**
 * Success and failure of get cartlist functions 
 */

export const cartlistSuccess = (response) => { //products success
    return { type: cartlistActions.GET_CARTLIST_SUCCESS, payload: response };
}

export const cartlistFailure = (error) => { //products failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: cartlistActions.GET_CARTLIST_FAILURE, payload: errorMessage };
}

export const getCartList = (userData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/carts', userData, { withCredentials: true }).then(response => {
            dispatch(cartlistSuccess(response.data));
        })
        .catch(error => {
            dispatch(cartlistFailure(error));   
        });
    }
}
/**
 * Success and failure of add cart item functions 
 */

export const addCartItemSuccess = (response) => { //products success
    return { type: addCartItemActions.ADD_CART_ITEM_SUCCESS, payload: response };
}

export const addCartItemFailure = (error) => { //products failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: addCartItemActions.ADD_CART_ITEM_FAILURE, payload: errorMessage };
}

export const resetCartItem = () => {
    return { type: addCartItemActions.RESET_CART_ITEM };
}

export const addCartItem = (cartData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/carts/add', cartData, { withCredentials: true }).then(response => {
            dispatch(addCartItemSuccess(response.data));
        })
        .catch(error => {
            dispatch(addCartItemFailure(error));   
        });
    }
}
/**
 * Success and failure of delete cart item functions 
 */

export const deleteCartItemSuccess = (response) => { //products success
    return { type: deleteCartItemActions.DELETE_CART_ITEM_SUCCESS, payload: response };
}

export const deleteCartItemFailure = (error) => { //products failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: deleteCartItemActions.DELETE_CART_ITEM_FAILURE, payload: errorMessage };
}

export const deleteCartItem = (cartData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/carts/delete', cartData, { withCredentials: true }).then(response => {
            dispatch(deleteCartItemSuccess(response.data));
        })
        .catch(error => {
            dispatch(deleteCartItemFailure(error));   
        });
    }
}
/**
 * Success and failure of delete cart functions 
 */

export const deleteCartSuccess = (response) => { //products success
    return { type: deleteCartActions.DELETE_CART_SUCCESS, payload: response };
}

export const deleteCartFailure = (error) => { //products failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: deleteCartActions.DELETE_CART_FAILURE, payload: errorMessage };
}

export const deleteCartList = (userData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/carts/remove', userData, { withCredentials: true }).then(response => {
            dispatch(deleteCartSuccess(response.data));
        })
        .catch(error => {
            dispatch(deleteCartFailure(error));   
        });
    }
}