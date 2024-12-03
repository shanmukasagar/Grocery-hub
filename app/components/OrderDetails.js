import React from 'react';
import {Box, Typography} from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import orderStyles from "../sass/orders/_orderdetails.module.scss"

const OrderDetails = ({clickedOrder, handleClose}) => {

    return (
        <Box className = {orderStyles['order-details-main']}>
            <Box className = {orderStyles['order-top-main']}>
                <Typography className = {orderStyles['title']}>Ordered Items</Typography>
                <RxCross1 className = {orderStyles['cross-style']} onClick = {() => handleClose()}/>
            </Box>
            <Box className = {orderStyles['order-content-top']}>
                <Typography className = {orderStyles['nm-width']}>Item</Typography>
                <Typography className = {orderStyles['content-key']}>Quantity</Typography>
                <Typography className = {orderStyles['content-key']}>Price</Typography>
            </Box>
            <Box className = {orderStyles['horizantal-line']}></Box>
            {clickedOrder.length > 0 && clickedOrder.map((item,index) => (
                <React.Fragment key = {index}>
                    <Box className = {orderStyles['order-content-top']}>
                        <Typography className = {orderStyles['value-width']}>{item.nm}</Typography>
                        <Typography className = {orderStyles['content-value']}>{item.quantity}</Typography>
                        <Typography className = {orderStyles['content-value']}>{item.price}</Typography>
                    </Box>
                    {clickedOrder.length - 1 > index && (<Box className = {orderStyles['horizantal-line']}></Box> )}
                </React.Fragment>
            ))}
        </Box>
    )
}

export default OrderDetails