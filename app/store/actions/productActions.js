import axios from 'axios';
import { productsActions, categoryItemActions} from "./actions";

/**
 * Success and failure of get products functions 
 */

export const productsSuccess = (response) => { //products success
    return { type: productsActions.GET_PRODUCTS_SUCCESS, payload: response };
}

export const productsFailure = (error) => { //products failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: productsActions.GET_PRODUCTS_FAILURE, payload: errorMessage };
}

export const getProducts = () => { //Authenticate user login
    return function(dispatch) {
        axios.get('/api/products', { withCredentials: true }).then(response => {
            dispatch(productsSuccess(response.data));
        })
        .catch(error => {
            dispatch(productsFailure(error));   
        });
    }
}
/**
 * Success and failure of get category items functions
 */

export const categoryItemSuccess = (response) => { //category items success
    return { type: categoryItemActions.GET_CATEGORY_ITEMS_SUCCESS, payload: response };
}

export const categoryItemFailure = (error) => { //category items failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: categoryItemActions.GET_CATEGORY_ITEMS_FAILURE, payload: errorMessage };
}

export const getCategoryItems = (category) => { //Get category items
    return function(dispatch) {
        axios.get('/api/products/category', { 
            params: {
                category: category
            },
            withCredentials: true }).then(response => {
            dispatch(categoryItemSuccess(response.data));
        })
        .catch(error => {
            dispatch(categoryItemFailure(error));   
        });
    }
}