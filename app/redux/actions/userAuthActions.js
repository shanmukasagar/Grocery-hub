import axios from 'axios';
import {userLoginActions, userRegisterActions} from "../actions/actions";


export const userLoginSuccess = (response) => { //User authentication data success
    return { type: userLoginActions.USER_LOGIN_SUCCESS, payload: response };
}

export const userLoginFailure = (error) => { //User authentication data failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
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

export const userSignupSuccess = (response) => { //User Signup data success
    return { type: userRegisterActions.USER_SIGNUP_SUCCESS, payload: response };
}

export const userSignupFailure = (error) => { //User Signup data failure
    let errorMessage = '';
    if (error.response && error.response.data) {
        errorMessage = error.response.data || error.response.data.error || "Unknown error occurred"; 
    } else {
        errorMessage = error.message; 
    }
    return { type: userRegisterActions.USER_SIGNUP_FAILURE, payload: errorMessage };
}

export const resetUserSignupData = () => { //Reset error occured after trying to authenticate login user
    return { type: userRegisterActions.RESET_SIGNUP};
}

export const getUserRegistration = (reqBody) => { //Authenticate user login
    return function(dispatch) {
        axios.post("http://localhost:3000/api/signup", reqBody, { withCredentials: true }).then(response => {
            dispatch(userSignupSuccess(response.data));
        })
        .catch(error => {
            dispatch(userSignupFailure(error));   
        });
    }
}
