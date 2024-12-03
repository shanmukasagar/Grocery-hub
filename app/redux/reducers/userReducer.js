import {userLoginActions, userRegisterActions} from "../actions/actions";

const userLoginState = {
    userLoginData : {},
    generalError : '',
    isAuthenticated : false
}

const userRegisterState = {
    registeredUser : {},
    generalError : '',
}

export const authUserDataReducer = (state = userLoginState, action) => { //User login reducer
    switch(action.type) {
        case userLoginActions.USER_LOGIN_SUCCESS:
            return {
                ...state,
                generalError: "success",
                isAuthenticated : true,
                userLoginData: action.payload
            };
        case userLoginActions.USER_LOGIN_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                userLoginData: {},
            };
        case userLoginActions.RESET_LOGIN:
            return {
                ...state,
                generalError: '',
                userLoginData: {}
            }
        default:
            return state;
    }
}

export const userRegisterReducer = (state = userRegisterState, action) => { //User register reducer
    switch(action.type) {
        case userRegisterActions.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                generalError: "success",
                registeredUser: action.payload
            };
        case userRegisterActions.USER_SIGNUP_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                registeredUser: {},
            };
        case userRegisterActions.RESET_SIGNUP:
            return {
                ...state,
                generalError: ''
            }
        default:
            return state;
    }
}