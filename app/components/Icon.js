import React from 'react';
import {Box, Typography } from "@mui/material";
import Image from 'next/image';
import IconStyles from "../sass/_Icon.module.scss";
import { useRouter } from 'next/navigation';

const IconContainer = () => {
    const router = useRouter();
    return (
        <Box className = {IconStyles['icon-main']} onClick = {() => router.push('/')}>
            <Image src="/basket.png" alt="Logo" className = {IconStyles['image-style']} width={60} height={70} />
            <Box>
                <Typography className = {IconStyles['grocery-title']}>Grocery</Typography>
                <Typography className = {IconStyles['store-title']}>Store</Typography>
            </Box>
        </Box>
    )
}

export default IconContainer;