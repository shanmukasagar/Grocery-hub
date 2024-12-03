"use client"
import React, {useRef, useEffect} from 'react';
import Slider from "./Slider";
import CategoryList from './CategoryList';
import ProductsList from './Products';
import { Box } from '@mui/material';
import Homestyles from "../sass/_home.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import {getProducts} from "../store/actions/productActions";
import Header from './Header';
import Footer from './Footer';


const Home = () => {

    const fetchOnce = useRef(false);
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.productsReducer.productsData);

    useEffect(() => {
        if(!fetchOnce.current) {
            if(productsData.length <= 0) {
                dispatch(getProducts());
                fetchOnce.current = true;
            }
        }
    },[dispatch])

    return (
        <Box className = {Homestyles['home-main']}>
            <Header/>
            <Slider/>
            <CategoryList/>
            <ProductsList productsData = {productsData}/>
            <Footer/>
        </Box>
    )
}

export default Home