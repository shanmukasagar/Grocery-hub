"use client"
import React from "react";
import {Box, Typography, Button} from "@mui/material";
import Image from 'next/image';
import successStyles from "../../sass/payments/_failure.module.scss";
import { useRouter } from 'next/navigation';

const Failure = () => {

  const router = useRouter();

  const handleBackButton = () => {
    router.push('/');
  }

  return (
    <Box className = {successStyles['failure-main']}>
      <Image src="/payment-failed-icon.png" alt="Logo" width={250} height={300} />
      <Typography className = {successStyles['failure-msg']}>Payment Failed</Typography>
      <Button onClick = {handleBackButton} className = {successStyles['button-style']}>Go Back</Button>
    </Box>
  )
  };

export default Failure;
  