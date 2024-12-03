import { addOrderItemActions, getOrderItemActions } from "./actions";
import axios from 'axios';

/**
 * Success and failure of add order of items
 */

export const orderSuccess = (response) => { //User registration success
    return { type: addOrderItemActions.ADD_ORDER_ITEM_SUCCESS, payload: response };
}

export const orderFailure = (error) => { //User registration failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: addOrderItemActions.ADD_ORDER_ITEM_FAILURE, payload: errorMessage };
}

export const addOrder = (orderData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/orders', orderData, { withCredentials: true }).then(response => {
            dispatch(orderSuccess(response.data));
        })
        .catch(error => {
            dispatch(orderFailure(error));   
        });
    }
}
/**
 * Success and failure of get order of items
 */

export const getOrderSuccess = (response) => { //User registration success
    return { type: getOrderItemActions.GET_ORDER_ITEM_SUCCESS, payload: response };
}

export const getOrderFailure = (error) => { //User registration failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: getOrderItemActions.GET_ORDER_ITEM_FAILURE, payload: errorMessage };
}

export const getOrderItems = (userData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/orders/get', userData, { withCredentials: true }).then(response => {
            dispatch(getOrderSuccess(response.data));
        })
        .catch(error => {
            dispatch(getOrderFailure(error));   
        });
    }
}