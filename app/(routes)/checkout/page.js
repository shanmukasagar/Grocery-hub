"use client"

import React, {useState, useRef, useEffect} from 'react';
import {Box, Typography, Grid, TextField, Button } from "@mui/material";
import checkoutStyles from "../../sass/checkout/_checkot.module.scss";
import { loadStripe } from '@stripe/stripe-js';
import { useSelector, useDispatch} from "react-redux";
import {addOrder} from "../../store/actions/orderActions";
import {deleteCartList} from "../../store/actions/cartlistActions"
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const checkoutPage = () => {
    const cartData = useSelector((state) => state.cartsReducer.cartData);
    const [totals, setTotals] = useState({ amount : 0, delivery : 60, tax : 20});
    const [userInfo, setUserInfo] = useState({nm : '', email : '', phone : '', zip : '', address : ''});
    const [errorMessage, setErrorMessage] = useState(false);

    const fetchOnce = useRef(false);
    const dispatch = useDispatch();
    const [clickOnce, setClickOnce] = useState(false);

    // Stripe publishable key
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    useEffect(() => {
        if(!fetchOnce.current) {
            let price = 0;
            for(const item of cartData) {
                price += item.price; 
            }
            setTotals((prevState) => ({...prevState, amount : price}));
        }
    },[cartData])

    const handleTextFieldChange = (e) => {
        setUserInfo((prevState) => ({...prevState, [e.target.name] : e.target.value}));
    }

    const addOrderDetails = () => {
        dispatch(addOrder(userInfo));
        dispatch(deleteCartList({t_id : userInfo.t_id}));
    }

    const handlePayment = async () => {
        for(const item of Object.keys(userInfo)) {
            if(userInfo[item] === "") {
                setErrorMessage(true);
                return;
            }
        }
        setErrorMessage(false);
        setClickOnce(true);
        if(cartData.length > 0) {
            userInfo.t_id = cartData[0].t_id;
            userInfo.amount = totals['amount'] + totals['delivery'] + totals['tax'];
            userInfo.items = cartData;
            addOrderDetails(userInfo);
        }
        const totalAmount = totals['amount'] + totals['delivery'] + totals['tax']; 
        const res = await fetch('/api/create-checkout-session',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: totalAmount, // Total amount to be paid
            }),
        });

        const { sessionId } = await res.json();

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            console.log("Stripe Checkout error", error);
            setClickOnce(false);
        }
    };


    return (
        <React.Fragment>
            <Box className = {checkoutStyles['checkout-main']}>
                <Header/>
                <Box className = {checkoutStyles['checkout-top-box']}>
                    <Typography className = {checkoutStyles['checkout-title']}>Checkout</Typography>
                </Box>
                <Box className = {checkoutStyles['checkout-content-main']}>
                    <Box className = {checkoutStyles['personal-details-main']}>
                        <Typography className = {checkoutStyles['title-style']}>Billing Details</Typography>
                        <Box className = {checkoutStyles['user-details-main']}>
                            <Box className= {checkoutStyles['fields-main']}>
                                <TextField required className = {checkoutStyles['error-border']} fullWidth label = "Name" 
                                    name = "nm" value = {userInfo['nm']} onChange = {handleTextFieldChange}/>
                                <TextField required fullWidth label = "Email" name = "email" value = {userInfo['email']} onChange = {handleTextFieldChange}/>
                            </Box>
                            <Box className= {checkoutStyles['fields-main']}>
                                <TextField required fullWidth label = "Phone" name = "phone" value = {userInfo['phone']} onChange = {handleTextFieldChange}/>
                                <TextField required fullWidth label = "Zip" name = "zip" value = {userInfo['zip']} onChange = {handleTextFieldChange}/>
                            </Box>
                            <TextField required fullWidth label = "Address" name = "address" value = {userInfo['address']} onChange = {handleTextFieldChange}/>
                        </Box>
                        {errorMessage && (<Typography className = {checkoutStyles['error-message']}>Please fill required fields</Typography>)}
                    </Box>
                    <Box className = {checkoutStyles['payment-box-main']}>
                        <Box className = {checkoutStyles['payment-top-style']}>
                            <Typography className = {checkoutStyles['cart-items-count']}>{`TotalCart(${cartData.length})`}</Typography>
                        </Box>
                        <Box className = {checkoutStyles['payment-details-main']}>
                            <Box className = {checkoutStyles['content-main']} >
                                <Typography className = {checkoutStyles['total--style']}>Subtotal</Typography>
                                <Typography className = {checkoutStyles['total--style']}>₹ {totals['amount']}</Typography>
                            </Box>
                            <Box className = {checkoutStyles['divider-style']}></Box>
                            <Box className = {checkoutStyles['content-main']}>
                                <Typography className = {checkoutStyles['tax-text-style']}>Delivery</Typography>
                                <Typography className = {checkoutStyles['tax-text-style']}>₹ {totals['delivery']}</Typography>
                            </Box>
                            <Box className = {checkoutStyles['content-main']}>
                                <Typography className = {checkoutStyles['tax-text-style']}>Tax</Typography>
                                <Typography className = {checkoutStyles['tax-text-style']}>₹ {totals['tax']}</Typography>
                            </Box>
                            <Box className = {checkoutStyles['divider-style']}></Box>
                            <Box className = {checkoutStyles['content-main']}>
                                <Typography className = {checkoutStyles['total--style']}>Total</Typography>
                                <Typography className = {checkoutStyles['total--style']}>₹ {totals['amount'] + totals['delivery'] + totals['tax']}</Typography>
                            </Box>
                            <Button disabled = {clickOnce} className = {clickOnce ? checkoutStyles['disabled-button'] : checkoutStyles['button-style']} 
                                onClick={handlePayment}>Payment</Button>
                        </Box>
                    </Box>
                </Box>
                <Footer/>
            </Box>
        </React.Fragment>
    )
}

export default checkoutPage;