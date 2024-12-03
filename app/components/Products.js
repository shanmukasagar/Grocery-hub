"use client"
import React, {useState} from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';
import productStyles from "../sass/_products.module.scss";
import Image from 'next/image';
import ProductItem from "../components/ProductItem";


const Products = ({productsData}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [clickedItem, setClickedItem] = useState({});

    const handleCartButton = (item) => {
        setShowDialog(true);
        setClickedItem(item);

    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <React.Fragment>
            <Box className = {productStyles['products-main']}>
                <Typography className = {productStyles['title-style']}>Our Popular Products</Typography>
                <Box className = {productStyles['all-products']}>
                    {productsData && productsData.length > 0 && productsData.map((item,index) => (
                        <Box className = {productStyles['product-box-main']} key = {index}>
                            <Image src={item.image} alt="Logo" width={150} height={250} />
                            <Box className = {productStyles['prices-main']}>
                                <Typography className = {productStyles['price-quantity']}>{`${item.nm}  ${item.quantity}`}</Typography>
                                <Typography className = {productStyles['price-quantity']}>₹ {item.price}</Typography>
                            </Box>
                            <Button onClick = {() => handleCartButton(item)} className = {productStyles['cart-button']}>Add to cart</Button>
                        </Box>
                    ))}
                </Box>
            </Box>
            {showDialog && (
                <Dialog open = {showDialog} onClose = {handleClose} PaperProps={{
                    sx: { maxWidth: '700px' }, // Custom styles for paper
                  }}>
                    <ProductItem handleClose = {handleClose} clickedItem = {clickedItem}/>
                </Dialog>
            )}
        </React.Fragment>
    )
}

export default Products;