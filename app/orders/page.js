"use client"
import React, {useState, useEffect, useRef} from 'react';
import {Box, Typography, Dialog} from "@mui/material";
import orderStyles from "../sass/orders/_orders.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import {getOrderItems} from "../store/actions/orderActions";
import OrderDetails from '../components/OrderDetails';
import dayjs from 'dayjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {cookieDataChecking, resetUserAuthData} from '../store/actions/userAuthActions';
import { useRouter } from 'next/navigation';

const orders = () => {

    const [showDialog, setShowDialog] = useState(false);
    const [clickedOrder, setClickedOrder] = useState([]);
    const router = useRouter();

    const dispatch = useDispatch();
    const fetchOnce = useRef(false);
    const initialOnce = useRef(false);
    const isAuthenticated = useSelector(state => state.authUserDataReducer.isAuthenticated);
    const userData = useSelector(state => state.authUserDataReducer.userLoginData);
    const orderData = useSelector(state => state.getOrderReducer.orderData);
    const userResponse = useSelector((state) => state.authUserDataReducer.generalError);

   useEffect(() => {
    if(userResponse) {
        if(userResponse === "success") {
            if(!initialOnce.current) {
                dispatch(getOrderItems(userData));
                initialOnce.current = true;
            }
        }
        else{
            dispatch(resetUserAuthData());
            router.push('/signin');
        }
    }

   },[userResponse])

    useEffect(() => {
        if(!fetchOnce.current) {
            dispatch(cookieDataChecking());
            fetchOnce.current = true;
        }
    })

    const handleOpenDialog = (items) => {
        setShowDialog(true);
        setClickedOrder(items);
    }

    const handleClose = () => {
        setShowDialog(false);
    }

    return (
        <React.Fragment>
            <Box className = {orderStyles['orders-main']}>
                <Header/>
                <Box className = {orderStyles['header-main']}>
                    <Typography className = {orderStyles['title']}>My Orders</Typography>
                </Box>
                <Typography className = {orderStyles['main-title']}>Order History</Typography>
                <Box className = {orderStyles['all-orders-box']}>
                    {orderData.length > 0 ? orderData.map((item,index) => (
                        <Box className = {orderStyles['orders-box-main']} key = {index} onClick = {() => handleOpenDialog(item.items)}>
                            <Box className = {orderStyles['orders-content-main']}>
                                <Typography className = {orderStyles['order-title']}>Orderdate: </Typography>
                                <Typography className = {orderStyles['order-content']}>{dayjs(item.c_on).format("DD/MM/YYYY")}</Typography>
                            </Box>
                            <Box className = {orderStyles['orders-content-main']}>
                                <Typography className = {orderStyles['order-title']}>Totalamount: </Typography>
                                <Typography className = {orderStyles['order-content']}>{item.amount}</Typography>
                            </Box>
                            <Box className = {orderStyles['orders-content-main']}>
                                <Typography className = {orderStyles['order-title']}>status: </Typography>
                                <Typography className = {orderStyles['order-content']}>success</Typography>
                            </Box>
                        </Box>
                    )) : (<Typography className = {orderStyles['no-order']}>No orders to display</Typography>)}
                </Box>
                <Footer/>
            </Box>
            {showDialog && (
                <Dialog open = {showDialog} onClose = {handleClose} PaperProps={{
                    sx: { maxWidth: '700px' }, // Custom styles for paper
                  }}>
                    <OrderDetails clickedOrder = {clickedOrder} handleClose = {handleClose}/>
                </Dialog>
            )}
        </React.Fragment>
    )
}

export default orders;