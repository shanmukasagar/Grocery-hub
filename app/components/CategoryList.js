"use client"
import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import categorylistStyles from "../sass/_categorylist.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CategoryList = () => {

    const router = useRouter();

    const handleCategory = (path) => {
        router.push(`/products-category/${path}`);
    }


    return (
        <Box className = {categorylistStyles['category-main']}>
            <Typography className = {categorylistStyles['title-style']}>Category List</Typography>
            <Box className= {categorylistStyles['items-list-main']}>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick = {() => handleCategory("vegetables")}>
                        <Image src="/categories/vegetables.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Vegetables</Typography>
                    </Box>
                </Box>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick={() => handleCategory("grains")}>
                        <Image src="/categories/rice.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Grains</Typography> 
                    </Box>
                </Box>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick={() => handleCategory("fruits")}>
                        <Image src="/categories/fruits.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Fruits</Typography>
                    </Box>
                </Box>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick={() => handleCategory("milk")}>
                        <Image src="/categories/milk.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Milk</Typography>
                    </Box>
                </Box>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick={() => handleCategory("bakery")}>
                        <Image src="/categories/bakery.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Bakery</Typography>
                    </Box>
                </Box>
                <Box className = {categorylistStyles['item-style']}>
                    <Box className = {categorylistStyles['image-main']} onClick={() => handleCategory("nonveg")}>
                        <Image src="/categories/chicken-leg.png" alt="Logo" width={60} height={70} />
                        <Typography className = {categorylistStyles['item-name']}>Chicken and Eggs</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CategoryList;