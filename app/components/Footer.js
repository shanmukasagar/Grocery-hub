import React from 'react';
import {Box, Typography, Link, IconButton} from "@mui/material";
import Image from 'next/image';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import FooterStyles from "../sass/_footer.module.scss";

const Footer = () => {
    return (
            <Box className = {FooterStyles['footer-main']}>
                <Box className = {FooterStyles['footer-top']}>
                    <Box className = {FooterStyles['image-main']}>
                        <Image src="/store.png" alt="Logo" width={60} height={70} />
                        <Typography className = {FooterStyles['title-style']}>Grocery Store</Typography>
                    </Box>
                    <Typography className = {FooterStyles['content-style']}>Shop with confidence! Affordable prices, fast delivery, and a wide range of groceries to meet all your needs.</Typography>
                </Box>
                <Box className = {FooterStyles['links-main']}>
                    <Link href="#" className = {FooterStyles['link-style']}>About</Link>
                    <Link href="#" className = {FooterStyles['link-style']}>Carrers</Link>
                    <Link href="#" className = {FooterStyles['link-style']}>History</Link>
                    <Link href="#" className = {FooterStyles['link-style']}>Services</Link>
                    <Link href="#" className = {FooterStyles['link-style']}>Products</Link>
                    <Link href="#" className = {FooterStyles['link-style']}>Blog</Link>
                </Box>
                <Box className = {FooterStyles['icons-main']}>
                    <IconButton href="https://facebook.com" target="_blank" className = {FooterStyles['icon-style']}><Facebook /></IconButton>
                    <IconButton href="https://twitter.com" target="_blank" className = {FooterStyles['icon-style']}> <Twitter /> </IconButton>
                    <IconButton href="https://instagram.com" target="_blank" className = {FooterStyles['icon-style']}> <Instagram /> </IconButton>
                    <IconButton href="https://linkedin.com" target="_blank" className = {FooterStyles['icon-style']}> <LinkedIn /> </IconButton>
                </Box>
            </Box>
    )
}

export default Footer