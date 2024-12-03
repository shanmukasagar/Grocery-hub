"use client"
import React, {useState, useEffect} from 'react';
import {Box, Typography, Button} from "@mui/material";
import { ImCross } from "react-icons/im";
import Image from 'next/image';
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import ItemPopupStyles from "../sass/_productitem.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import {addCartItem, resetCartItem} from "../store/actions/cartlistActions";
import { useRouter } from 'next/navigation';
import { Alert, Stack } from '@mui/material';

const ProductItem = ({handleClose, clickedItem}) => {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const router = useRouter();

    /***
    * State variables for managing validation & alerts
    */
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const addCartResponse = useSelector((state) => state.addCartItemReducer.generalError);
    const userDetails = useSelector((state) => state.authUserDataReducer.userLoginData);
    const cartlist = useSelector ((state) => state.cartsReducer.cartData);

    const handleCrossClick = () => {
        dispatch(resetCartItem());
        setQuantity(1);
        setPrice(0);
        handleClose();
    }

    useEffect(() => {
        if(addCartResponse.length > 0) {
            if(addCartResponse === "success") {
                dispatch(resetCartItem());
                setQuantity(1);
                setPrice(0);
                handleClose();
            }
            else if(addCartResponse === "unauthorized") {
                dispatch(resetCartItem());
                setQuantity(1);
                setPrice(0);
                handleClose();
                router.push('/signin');
            }
            else{
                setAlertSeverity('error');
                setAlertSeverity(addCartResponse);
                setShowAlert(true);
            }
        }
    },[addCartResponse])

    useEffect(() => {
        setPrice(clickedItem.price);
        setQuantity(1);
    },[clickedItem])

    const hideAlert = () => { //Hide alert after clicking close button
        setShowAlert(false);
        dispatch(resetCartItem());
    };

    const handleDecrement = () => {
        if(quantity > 1) {
            const amount = (quantity - 1) * clickedItem.price;
            setQuantity(quantity - 1);
            setPrice(amount);
        }
    }

    const handleIncrement = () => {
        const amount = (quantity + 1) * clickedItem.price;
        setQuantity(quantity + 1);
        setPrice(amount);
    }

    const handleAddCart = () => {
        const cartData = {
            ...clickedItem,
            price : price,
            quantity : quantity,
            t_id : userDetails.email || ""
        };
        cartlist.push(cartData);
        dispatch(addCartItem(cartData));
    }

    return (
        <Box className = {ItemPopupStyles['product-item-main']}>
            <ImCross onClick = {handleCrossClick} className = {ItemPopupStyles['cross-icon']}/>
            {showAlert && ( <Stack className = {ItemPopupStyles['alert']}>
                <Alert severity={alertSeverity} onClose={hideAlert}>  {alertMessage} </Alert>  
            </Stack> )}
            {Object.keys(clickedItem).length > 0 && (
                <Box className = {ItemPopupStyles['product-content']}>
                    <Box className = {ItemPopupStyles['image-main']}>
                        <Image src={clickedItem.image} alt="Logo" width={150} height={200} />
                    </Box>
                    <Box className = {ItemPopupStyles['description-main']}>
                        <Typography className = {ItemPopupStyles['product-title']}>{clickedItem.nm}</Typography>
                        <Typography className = {ItemPopupStyles['prod-desc']}>{clickedItem.desc}</Typography>
                        <Typography className = {ItemPopupStyles['prod-price']}>₹ {price}</Typography>
                        <Typography className = {ItemPopupStyles['product-quantity']}>Quantity {`(${clickedItem.quantity})`}</Typography>
                        <Box className = {ItemPopupStyles['quantity-incre-button-gap']}>
                            <Box className = {ItemPopupStyles['quantity-incre-decre']}>
                                <GrFormSubtract className = {ItemPopupStyles['increment-icon']} onClick = {handleDecrement} 
                                    disabled={quantity === 1} style={{ cursor: quantity === 1 ? 'not-allowed' : 'pointer' }} />
                                <Typography>{quantity}</Typography>
                                <IoMdAdd className = {ItemPopupStyles['increment-icon']} onClick = {handleIncrement}/>
                            </Box>
                            <Button className = {ItemPopupStyles['button-style']} onClick = {handleAddCart}>Add to cart</Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default ProductItem