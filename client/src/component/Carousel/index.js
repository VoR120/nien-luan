import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import makeStyles from '@mui/styles/makeStyles';
import banner3 from '../../public/img/banner1.jpg';
import banner2 from '../../public/img/banner2.jpg';
import banner1 from '../../public/img/banner3.jpg';
import { Link } from 'react-router-dom'

const CarouselSlider = () => {
    return (
        <Carousel
            autoPlay={true}
            showThumbs={false}
            infiniteLoop
            showStatus={false}
        >
            <Link to="collection/Cosmic-Lube">
                <div>
                    <img src={banner1} alt="banner1" />
                </div>
            </Link>
            <Link to="productdetail/moyu-weilong-ai-bluetooth-3x3">
                <div>
                    <img src={banner2} alt="banner2" />
                </div>
            </Link>
            <Link to="productdetail/gan-11-m-pro-mini-3x3">
                <div>
                    <img src={banner3} alt="banner3" />
                </div>
            </Link>
        </Carousel>
    );
};

export default CarouselSlider;