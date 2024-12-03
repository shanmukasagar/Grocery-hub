"use client"
import React, {useEffect, useRef} from "react";
import {Box, Typography, Button} from "@mui/material";
import Image from 'next/image';
import successStyles from "../../sass/payments/_success.module.scss";
import { useRouter } from 'next/navigation';
import {deleteCartList} from "../../store/actions/cartlistActions";
import {useDispatch, useSelector} from "react-redux";

const Success = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const fetchOnce = useRef(false);

  const userData = useSelector((state) => state.authUserDataReducer.userLoginData);

  // useEffect(() => {
  //   if(!fetchOnce.current) {
  //     dispatch(deleteCartList(userData));
  //     fetchOnce.current = true;
  //   }
  // },[])

  const handleBackButton = () => {
    router.push('/');
  }

  return (
    <Box className = {successStyles['success-main']}>
      <Image src="/payment-success-icon.png" alt="Logo" width={250} height={300} />
      <Typography className = {successStyles['success-msg']}>Payment successfully completed</Typography>
      <Button onClick = {handleBackButton} className = {successStyles['button-style']}>Go Back</Button>
    </Box>
  )
  };

export default Success;
  