"use client"

import React, {useState} from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import SliderStyles from "../sass/_slider.module.scss";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Slider = () => {
    const bannersArray = ['banner1.jpg', 'banner2.jpg', 'banner3.avif'];
    const [nextBanner, setNextBanner] = useState(0);

    const handlePreviousBanner = () => {
        setNextBanner(nextBanner - 1);
    }

    const handleNextBanner = () => {
        setNextBanner(nextBanner + 1);
    }

    return (
        <Box className = {SliderStyles['slider-main']}>
            <IoIosArrowBack className={`${SliderStyles['icon-style']} ${nextBanner === 0 ? SliderStyles['disabled-icon'] : ''}`} 
                onClick={nextBanner === 0 ? null : handlePreviousBanner} />
            <Card>
                <CardMedia component="img" image={"/banners/"+ bannersArray[nextBanner % 3]} alt="Paella dish" className = {SliderStyles['card-media']}/>
            </Card>
            <IoIosArrowForward className={`${SliderStyles['icon-style']} ${nextBanner === 2 ? SliderStyles['disabled-icon'] : ''}`} 
            onClick={nextBanner === 2 ? null : handleNextBanner}/>
        </Box>
    )
}

export default Slider