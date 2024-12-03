
import {addOrderItemActions, getOrderItemActions} from "../actions/actions";

const orderState = {
    orderInfo : "",
    generalError : '',
};
const orderDetailsState = {
    orderData : [],
    generalError : ''
};

/**
 * Reducer for add order
 */
export const orderReducer = (state = orderDetailsState, action) => { //User signup reducer
    switch(action.type) {
        case addOrderItemActions.ADD_ORDER_ITEM_SUCCESS:
            return {
                ...state,
                generalError: "success",
                orderInfo: action.payload
            };
        case addOrderItemActions.ADD_ORDER_ITEM_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                orderInfo: "",
            };
        default:
            return state;
    }
}
/**
 * Reducer for get order
 */
export const getOrderReducer = (state = orderDetailsState, action) => { //User signup reducer
    switch(action.type) {
        case getOrderItemActions.GET_ORDER_ITEM_SUCCESS:
            return {
                ...state,
                generalError: "success",
                orderData: action.payload
            };
        case getOrderItemActions.GET_ORDER_ITEM_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                orderData: [],
            };
        default:
            return state;
    }
}