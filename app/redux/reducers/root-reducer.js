import { combineReducers } from "redux";
import {authUserDataReducer, userRegisterReducer} from "./userReducer"

const rootReducer = combineReducers({
    authUserDataReducer,
    userRegisterReducer
});

export default rootReducer;