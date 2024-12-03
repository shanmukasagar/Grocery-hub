import {userLoginActions, userSignupActions, userLogoutActions} from "../actions/actions";

const userLoginState = {
    userLoginData : {},
    generalError : '',
    isAuthenticated : false
};

const userSignupState = {
    userSignupData : "",
    generalError : '',
}

const userLogoutState = {
    userLogoutData : '',
    generalError : '',
};


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
                isAuthenticated : false,
            };
        case userLoginActions.RESET_LOGIN:
            return {
                ...state,
                generalError: '',
                userLoginData: {},
                isAuthenticated : false,
                
            }
        default:
            return state;
    }
}
/**
 * Reducer for user registration 
 */
export const userSignupReducer = (state = userSignupState, action) => { //User signup reducer
    switch(action.type) {
        case userSignupActions.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                generalError: "success",
                userLoginData: action.payload
            };
        case userSignupActions.USER_SIGNUP_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                userLoginData: "",
            };
        case userSignupActions.RESET_SIGNUP:
            return {
                ...state,
                generalError: '',
                userLoginData: ""
            }
        default:
            return state;
    }
}

export const authUserLogout = (state = userLogoutState, action) => { //User logout reducer
    switch(action.type) {
        case userLogoutActions.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                generalError: "success",
                userLogoutData: action.payload
            };
        case userLogoutActions.USER_LOGOUT_FAILURE:
            return {
                ...state,
                generalError: action.payload,
                userLogoutData: '',
            };
        case userLogoutActions.RESET_LOGOUT:
            return {
                ...state,
                generalError: '',
                userLogoutData: '',
            }
        default:
            return state;
    }
}
