"use client"
import React, {useState, useEffect, useRef} from 'react';
import {Box, Button, Typography} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import Image from 'next/image';
import cartItemsStyles from "../sass/_cartlist.module.scss";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import {getCartList, deleteCartItem} from "../store/actions/cartlistActions";
import {useRouter} from "next/navigation";


const Cartlist = ({toggleDrawer}) => {

    const fetchOnce = useRef(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const router = useRouter();

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartsReducer.cartData);
    const cartDataResponse = useSelector((state) => state.cartsReducer.generalError);
    const userData = useSelector(state => state.authUserDataReducer.userLoginData);

    useEffect(() => {
        if(cartDataResponse.length > 0) {
            if(cartDataResponse === "unauthorized") {
                toggleDrawer(false);
                router.push("/signin");
            }
        }
    },[cartDataResponse])

    useEffect(() => {
        if(cartData.length > 0) {
            let totalPrice = 0;
            for(const item of cartData) {
                totalPrice += item.price;
            }
            setTotalAmount(totalPrice);
        }
        else{
            setTotalAmount(0);
        }
    },[cartData])

    useEffect(() => {
        if(!fetchOnce.current) {
            dispatch(getCartList(userData));
            fetchOnce.current = true;
        }
    },[dispatch])

    const handleDeleteIcon = (item) => {
        dispatch(deleteCartItem(item));
        dispatch(getCartList(userData));
    }

    const handleCheckOut = () => {
        router.push('/checkout');
        toggleDrawer(false);
    }

    return (
        <Box className = {cartItemsStyles['cart-list-main']}>
            <Box className = {cartItemsStyles['cart-items-main']}>
                <Box className = {cartItemsStyles['header-style']}>
                    <Typography className = {cartItemsStyles['title-style']}>My Cart</Typography>
                    <RxCross1 className = {cartItemsStyles['cross-style']} onClick = {() => toggleDrawer(false)}/>
                </Box>
                <Box className = {cartItemsStyles['scroll-bar']} >
                    {cartData.length > 0 ? cartData.map((item, index) => (
                        <Box className = {cartItemsStyles['items-list-main']} key = {index}>
                            <Box className = {cartItemsStyles['image-content-main']}>
                                <Box className = {cartItemsStyles['image-box']}>
                                    <Image src={item.image} alt="Logo" width={60} height={70} />
                                </Box>
                                <Box >
                                    <Typography className = {cartItemsStyles['title-style']}>{item.nm}</Typography>
                                    <Typography className = {cartItemsStyles['quantity']}>Quantity {item.quantity}</Typography>
                                    <Typography className = {cartItemsStyles['price']}>₹ {item.price}</Typography>
                                </Box>
                            </Box>
                            <MdDeleteOutline className = {cartItemsStyles['delete-icon']} onClick = {() => handleDeleteIcon(item)}/>
                        </Box>
                    )) : (
                        <Typography className = {cartItemsStyles['no-cart-items']}>No items in your cart</Typography>
                    )}
                </Box>
            </Box>
            <Box >
                <Box className = {cartItemsStyles['totals-main']}>
                    <Typography className = {cartItemsStyles['sub-total-text']}>Subtotal</Typography>
                    <Typography className = {cartItemsStyles['total-value']}>₹ {totalAmount}</Typography>
                </Box>
                <Button className = {cartData.length === 0 ? cartItemsStyles['disabled-btn'] : cartItemsStyles['button-style']}
                    onClick = {handleCheckOut} disabled = {cartData.length === 0}>Checkout</Button>
            </Box>
        </Box>
    )
}

export default Cartlist;