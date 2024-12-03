import axios from 'axios';
import {userLoginActions, userSignupActions, userLogoutActions} from "../actions/actions";


export const userLoginSuccess = (response) => { //User authentication data success
    return { type: userLoginActions.USER_LOGIN_SUCCESS, payload: response };
}

export const userLoginFailure = (error) => { //User authentication data failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: userLoginActions.USER_LOGIN_FAILURE, payload: errorMessage };
}

export const resetUserAuthData = () => { //Reset error occured after trying to authenticate login user
    return { type: userLoginActions.RESET_LOGIN};
}

export const getUserAuthentication = (userData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/users/login', userData, { withCredentials: true }).then(response => {
            dispatch(userLoginSuccess(response.data));
        })
        .catch(error => {
            dispatch(userLoginFailure(error));   
        });;
    }
}
/**
 * Success and failure of user signup functions 
 */

export const userSignupSuccess = (response) => { //User registration success
    return { type: userSignupActions.USER_SIGNUP_SUCCESS, payload: response };
}

export const userSignupFailure = (error) => { //User registration failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: userSignupActions.USER_SIGNUP_FAILURE, payload: errorMessage };
}

export const resetUserSignupData = () => { //Reset error occured after trying to authenticate login user
    return { type: userSignupActions.RESET_SIGNUP};
}

export const getUserRegistration = (userData) => { //Authenticate user login
    return function(dispatch) {
        axios.post('/api/users/signup', userData, { withCredentials: true }).then(response => {
            dispatch(userSignupSuccess(response.data));
        })
        .catch(error => {
            dispatch(userSignupFailure(error));   
        });
    }
}
/**
 * Success and failure of user logout functions 
 */
export const userLogoutSuccess = (response) => { //User authentication data success
    return { type: userLogoutActions.USER_LOGOUT_SUCCESS, payload: response };
}

export const userLogoutFailure = (error) => { //User authentication data failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data.msg || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: userLogoutActions.USER_LOGOUT_FAILURE, payload: errorMessage };
}

export const resetUserLogout = () => { //Reset error occured after trying to authenticate login user
    return { type: userLogoutActions.RESET_LOGOUT};
}


export const userLogout = () => { //Authenticate user logout
    return function(dispatch) {
        axios.get('/api/users/logout', { withCredentials: true }).then(response => {
            dispatch(userLogoutSuccess(response.data));
        })
        .catch(error => {
            dispatch(userLogoutFailure(error));   
        });
    }
}
/**
 * Cookie checking
 */
export const cookieDataChecking = () => { //Authenticate user logout
    return function(dispatch) {
        axios.get('/api/cookie', { withCredentials: true }).then(response => {
            dispatch(userLoginSuccess(response.data));
        })
        .catch(error => {
            dispatch(userLoginFailure(error));   
        });
    }
}