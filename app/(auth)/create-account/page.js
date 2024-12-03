"use client"
import React, {useState, useEffect} from 'react';
import {Box, Typography, TextField, Button, Link } from "@mui/material";
import IconContainer from '@/app/components/Icon';
import signupStyles from "../../sass/auth/_createaccount.module.scss";
import {getUserRegistration, resetUserSignupData} from "../../store/actions/userAuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { Alert, Stack } from '@mui/material';

const CreateAccount = () => {

    const [userData, setUserData] = useState({email : '', pwd : '', u_nm : ''});
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
    const registrationError = useSelector(state => state.userSignupReducer.generalError);

    useEffect(() => {
        if(registrationError.length > 0) {
            if(registrationError === "success") {
                setAlertSeverity('success');
                setAlertMessage("Account creation successfully");
            }
            else{
                setAlertSeverity('error');
                setAlertMessage(registrationError);
            }
            setShowAlert(true);
        }
    },[registrationError])

    const hideAlert = () => { //Hide alert after clicking close button
        setShowAlert(false);
        if(registrationError === "success") {
            router.push('/signin');
        }
        else{
            dispatch(resetUserSignupData());
        }
    };

    const handleTextFieldChange = (e) => {
        setUserData((prevState) => ({...prevState, [e.target.name] : e.target.value}));
    }

    const validateFields = () => { // valdate fields
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
        dispatch(getUserRegistration(userData));
    };

    
    return (
        <Box className = {signupStyles['user-register-main']}>
            {showAlert && ( 
                <Stack className = {signupStyles['alert']}>
                    <Alert severity={alertSeverity} onClose={hideAlert}> {alertMessage} </Alert>  
                </Stack> )}
            <Box className = {signupStyles['create-account-main']}>
                <Box className = {signupStyles['sub1-account-main']}>
                    <Box className = {signupStyles['sub2-account-box']}>
                        <Box className = {signupStyles['account-top-box']}>
                            <IconContainer/>
                            <Typography className = {signupStyles['create-account-title']}>Create Account</Typography>
                            <Typography className = {signupStyles['content-style']}>Enter your email and password to create an account</Typography>
                        </Box>
                        <Box className = {signupStyles['text-fields-main']}>
                            <TextField required fullWidth label = "Username" name = "u_nm" onChange = {handleTextFieldChange} value = {userData.u_nm} 
                                className = {(showErrorBorder && userData["u_nm"] === "") ? signupStyles['error-border'] : signupStyles['text-field-style']}>
                            </TextField>
                            <TextField required fullWidth label = "Email" name = "email" onChange = {handleTextFieldChange} value = {userData.email}
                                className = {(showErrorBorder && userData["email"] === "") ? signupStyles['error-border'] : signupStyles['text-field-style']}>
                            </TextField>
                            <TextField required fullWidth label = "Password" name = "pwd" onChange = {handleTextFieldChange}  value = {userData.pwd}
                                className = {(showErrorBorder && userData["pwd"] === "") ? signupStyles['error-border'] : signupStyles['text-field-style']}>
                            </TextField>
                            {errorMessage && (<Typography className = {signupStyles['text-field-error']}>Please fill required fields</Typography>)}
                            <Button className = {signupStyles['button-style']} onClick = {handleSubmit}>Create Account</Button>
                            <Typography className = {signupStyles['no-account-text']}>Already have an account<Link href = '/signin' className = {signupStyles['link-style']}>Click here to SignIn</Link></Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        
    )
}

export default CreateAccount;