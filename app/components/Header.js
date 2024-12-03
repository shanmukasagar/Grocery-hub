"use client"

import React, {useState, useEffect, useRef} from 'react';
import { Box, Typography, InputBase, Button, Badge, Drawer, Menu, MenuItem } from '@mui/material';
import HeaderStyles from "../sass/_Header.module.scss";
import { TbLayout2 } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import IconContainer from './Icon';
import Cartlist from './Cartlist';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {getCartList} from "../store/actions/cartlistActions";
import { CgProfile } from "react-icons/cg";
import {userLogout} from "../store/actions/userAuthActions";
import {resetUserAuthData, resetUserLogout} from "../store/actions/userAuthActions";


const Header = () => {
    // State for managing menu open/close
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const router = useRouter();

    const fetchOnce = useRef(false);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartsReducer.cartData);
    const logoutResponse = useSelector((state) => state.authUserLogout.generalError);
    const isAuthenticated = useSelector(state => state.authUserDataReducer.isAuthenticated);
    const userData = useSelector((state) => state.authUserDataReducer.userLoginData);

     // Close the menu when user scrolls
     useEffect(() => {
        const handleScroll = () => {
            if (anchorEl || anchorE2) {
                setAnchorEl(null); // Close the menu when scrolling
                setAnchorE2(null);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [anchorEl, anchorE2]); // Only re-run this effect if anchorEl changes

    useEffect(() => {
        if(logoutResponse.length > 0 ) {
            if(logoutResponse === "success") {
                dispatch(resetUserAuthData());
                dispatch(resetUserLogout());
                router.push('/signin');
            }
        }

    }, [logoutResponse])

    useEffect(() => {
        if(!fetchOnce.current) {
            if(isAuthenticated) {
                if(cartData.length <= 0) {
                    dispatch(getCartList());
                }
                fetchOnce.current = true;
            }
        }
    },[dispatch])

    const handleClick = (event) => { // Handle opening the menu
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { // Handle closing the menu
        setAnchorEl(null);
    };

    const toggleDrawer = (action) => { //Handle open drawer
        setOpenDrawer(action);
    }

    const handleCart = () => { //Handle cart button click
        setOpenDrawer(true);
    }

    const handleLogin = () => {
        router.push('/signin');
    }

    const handleCategory = (path) => {
        router.push(`/products-category/${path}`);
    }

    const handleLogout = () => {
        setAnchorE2(null);
        dispatch(userLogout());
    }

    const handleOrders = () => {
        setAnchorE2(null);
        router.push('/orders');
    }

    return (
        <React.Fragment>
            <Box className={HeaderStyles['Header-main']}>
                <Box className={HeaderStyles['sub-header-main']}>
                    <Box className = {HeaderStyles['Header-left-main']}>
                        <IconContainer/>
                        <Box>
                            <Box className={HeaderStyles['category-main']} onClick={handleClick}>
                                <TbLayout2 />
                                <Typography>Category</Typography>
                            </Box>
                            <Box>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} 
                                    PaperProps={{ sx: { marginTop: '5px',} }}>
                                    <MenuItem onClick={() => handleCategory("vegetables")}>Vegetables</MenuItem>
                                    <MenuItem onClick={() => handleCategory("grains")}>Grains</MenuItem>
                                    <MenuItem onClick={() => handleCategory("fruits")}>Fruits</MenuItem>
                                    <MenuItem onClick={() => handleCategory("milk")}>Milk</MenuItem>
                                    <MenuItem onClick={() => handleCategory("bakery")}>Bakery</MenuItem>
                                    <MenuItem onClick={() => handleCategory("nonveg")}>Chicken and Eggs</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                    <Box className = {HeaderStyles['Header-left-main']}>
                        <Box className = {HeaderStyles['cart-main']}>
                            <Badge badgeContent={cartData.length || 0} color="primary">
                                <IoCartOutline onClick = {() => toggleDrawer(true)} className = {HeaderStyles['cart-icon']} />
                            </Badge>
                        </Box>
                        {!isAuthenticated ? (<Button className = {HeaderStyles['button-style']} onClick = {handleLogin}>Login</Button>) : (
                            <Box>
                                <CgProfile className = {HeaderStyles['profile-style']} onClick={(e) => setAnchorE2(e.currentTarget)}/>
                                <Box>
                                    <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={() => setAnchorE2(null)} 
                                        PaperProps={{ sx: { marginTop: '5px',} }}>
                                        <MenuItem onClick={() => handleOrders()}>orders</MenuItem>
                                        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            {openDrawer && (
                <Drawer anchor = {'right'} open = {openDrawer} onClose = {() => toggleDrawer(false)}>
                    <Cartlist toggleDrawer = {toggleDrawer}/>
                </Drawer>
            )}
        </React.Fragment>
    )
}

export default Header