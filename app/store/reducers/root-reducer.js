import { combineReducers } from "redux";
import {authUserDataReducer, authUserLogout, userSignupReducer} from "./userReducer";
import {productsReducer, productCategoryReducer} from "./productsReducer";
import {cartsReducer, addCartItemReducer, deleteCartItemReducer, deleteCartListReducer} from "./cartlistReducer"
import { getOrderReducer, orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
    authUserDataReducer,
    userSignupReducer,
    productsReducer,
    cartsReducer,
    productCategoryReducer,
    addCartItemReducer,
    deleteCartItemReducer,
    authUserLogout,
    orderReducer,
    getOrderReducer,
    deleteCartListReducer
});

export default rootReducer;