"use client"

import React, {useState, useEffect} from 'react';
import {Box, Typography, TextField, Button, Link } from "@mui/material";
import IconContainer from '@/app/components/Icon';
import signupStyles from "../../sass/auth/_createaccount.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthentication, resetUserAuthData} from "../../store/actions/userAuthActions";
import { useRouter } from 'next/navigation';
import { Alert, Stack } from '@mui/material';

const CreateAccount = () => {

    const [userData, setUserData] = useState({email : '', pwd : ''});
    const [showErrorBorder, setShowErrorBorder] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(false);

     /***
     * State variables for managing validation & alerts
     */
     const [alertMessage, setAlertMessage] = useState('');
     const [alertSeverity, setAlertSeverity] = useState('info');
     const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const loginResponse = useSelector(state => state.authUserDataReducer.generalError);

    useEffect(() => { // Every time when login response changes
        if(loginResponse.length > 0) {
            if(loginResponse === "success") {
                router.push('/');
            }
            else{
                setAlertSeverity('error');
                setAlertMessage(loginResponse);
                setShowAlert(true);
            }
        }
    },[loginResponse])

    const hideAlert = () => { //Hide alert after clicking close button
        setShowAlert(false);
        if(loginResponse !== "success") {
            dispatch(resetUserAuthData());
        }
    };

    const handleTextFieldChange = (e) => {
        setUserData((prevState) => ({...prevState, [e.target.name] : e.target.value}));
    }

    const validateFields = () => {
        for(const item of Object.keys(userData)) {
            if(userData[item] === "") {
                setShowErrorBorder(true);
                setErrorMessage(true);
                return false;
            }
        }
        setErrorMessage(false);
        return true;
    }

    const handleSubmit = async (e) => {
        if(!validateFields()) {
            return;
        }
        dispatch(getUserAuthentication(userData));
    };

    return (
        <Box className = {signupStyles['user-register-main']}>
            {showAlert && ( <Stack className = {signupStyles['alert']}>
                <Alert severity={alertSeverity} onClose={hideAlert}>  {alertMessage} </Alert>  
            </Stack> )}
            <Box className = {signupStyles['create-account-main']}>
                <Box className = {signupStyles['sub1-account-main']}>
                    <Box className = {signupStyles['sub2-account-box']}>
                        <Box className = {signupStyles['account-top-box']}>
                            <IconContainer/>
                            <Typography className = {signupStyles['create-account-title']}>Signin to Account</Typography>
                            <Typography className = {signupStyles['content-style']}>Enter your email and password to Signin</Typography>
                        </Box>
                        <Box className = {signupStyles['text-fields-main']}>
                            <TextField required fullWidth label = "Email" value = {userData.email} name = "email" onChange = {handleTextFieldChange} className = {signupStyles['text-field-style']}></TextField>
                            <TextField required fullWidth label = "Password" value = {userData.pwd} name = "pwd" onChange = {handleTextFieldChange} className = {signupStyles['text-field-style']}></TextField>
                            {errorMessage && (<Typography className = {signupStyles['text-field-error']}>Please fill required fields</Typography>)}
                            <Button className = {signupStyles['button-style']} onClick = {handleSubmit}>Signin</Button>
                            <Typography className = {signupStyles['no-account-text']}>Don't have an account ?<Link href = '/create-account' className = {signupStyles['link-style']}>Click here to create new account</Link></Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateAccount;