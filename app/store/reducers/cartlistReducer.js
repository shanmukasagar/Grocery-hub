import {cartlistActions, addCartItemActions, deleteCartItemActions, deleteCartActions} from "../actions/actions";

const cartState = {
    cartData : [],
    generalError : ''
};
const addCartItemState = {
    cartItemResponse : '',
    generalError : ''
};
const deleteCartItemState = {
    deleteItemResponse : '',
    generalError : ''
};
const deleteCartListState = {
    deleteResponse : {},
    generalError : ''
}

/**
 * Reducer for get cart list
 */
export const cartsReducer = (state = cartState, action) => { 
    switch(action.type) {
        case cartlistActions.GET_CARTLIST_SUCCESS:
            return {
                ...state,
                generalError: "success",
                cartData: action.payload
            };
        case cartlistActions.GET_CARTLIST_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                cartData: [],
            };
        default:
            return state;
    }
}
/**
 * Reducer for add cart item into cart list
 */
export const addCartItemReducer = (state = addCartItemState, action) => { 
    switch(action.type) {
        case addCartItemActions.ADD_CART_ITEM_SUCCESS:
            return {
                ...state,
                generalError: "success",
                cartItemResponse: action.payload
            };
        case addCartItemActions.ADD_CART_ITEM_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                cartItemResponse: '',
            };
        case addCartItemActions.RESET_CART_ITEM:
            return {
                ...state,
                generalError: "",
                cartItemResponse: '',
            };
        default:
            return state;
    }
}
/**
 * Reducer for delete cart item from cart list
 */
export const deleteCartItemReducer = (state = deleteCartItemState, action) => { 
    switch(action.type) {
        case deleteCartItemActions.DELETE_CART_ITEM_SUCCESS:
            return {
                ...state,
                generalError: "success",
                deleteItemResponse: action.payload
            };
        case deleteCartItemActions.DELETE_CART_ITEM_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                deleteItemResponse: '',
            };
        default:
            return state;
    }
}
/**
 * Reducer for delete carts from cart list
 */
export const deleteCartListReducer = (state = deleteCartListState, action) => { 
    switch(action.type) {
        case deleteCartActions.DELETE_CART_SUCCESS:
            return {
                ...state,
                generalError: "success",
                deleteResponse: action.payload
            };
        case deleteCartActions.DELETE_CART_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                deleteResponse: {},
            };
        default:
            return state;
    }
}