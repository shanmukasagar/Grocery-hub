import {productsActions,categoryItemActions} from "../actions/actions";

const productsState = {
    productsData : [],
    generalError : ''
};

const categoryState = {
    categoryData : [],
    generalError : ''
}

/**
 * Reducer for get products
 */
export const productsReducer = (state = productsState, action) => { 
    switch(action.type) {
        case productsActions.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                generalError: "success",
                productsData: action.payload
            };
        case productsActions.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                productsData: [],
            };
        default:
            return state;
    }
}

/**
 * Reducer for get product category
 */
export const productCategoryReducer = (state = categoryState, action) => { 
    switch(action.type) {
        case categoryItemActions.GET_CATEGORY_ITEMS_SUCCESS:
            return {
                ...state,
                generalError: "success",
                categoryData: action.payload
            };
        case categoryItemActions.GET_CATEGORY_ITEMS_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                categoryData: [],
            };
        default:
            return state;
    }
}