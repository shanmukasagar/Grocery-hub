"use client"
import React, {useRef, useEffect} from 'react';
import { Box } from '@mui/material';
import CategoryList from '@/app/components/CategoryList';
import Products from '@/app/components/Products';
import categoryStyles from "../../../sass/selected-category/_selected-category.module.scss";
import { useParams } from 'next/navigation';
import {getCategoryItems} from "../../../store/actions/productActions";
import {useSelector, useDispatch} from "react-redux";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const pageCategory = () => {

    const params = useParams();
    const fetchOnce = useRef(false);

    const dispatch = useDispatch();
    const categoryData = useSelector(state => state.productCategoryReducer.categoryData);

    useEffect(() => {
        if(!fetchOnce.current) {
            dispatch(getCategoryItems(params['category-name']));
            fetchOnce.current = true;
        }
    })

    return (
        <Box className = {categoryStyles['selected-cat-main']}>
            <Header/>
            <Box className = {categoryStyles['category-top']}>
                <Box className={categoryStyles['selected-cat']}>
                    {params['category-name'].charAt(0).toUpperCase() + params['category-name'].slice(1)}
                </Box>
                <CategoryList/>
            </Box>
            <Products productsData = {categoryData}/>
            <Footer/>
        </Box>
    )
}

export default pageCategory;