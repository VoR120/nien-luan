import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core';
import banner1 from '../../public/img/banner1.jpg';
import banner2 from '../../public/img/banner2.jpg';
import banner3 from '../../public/img/banner3.jpg';

const CarouselSlider = () => {
    return (
        <Carousel
            autoPlay={true}
            showThumbs={false}
            infiniteLoop
            showStatus={false}
        >
            <div>
                <img src={banner1} />
            </div>
            <div>
                <img src={banner2} />
            </div>
            <div>
                <img src={banner3} />
            </div>
        </Carousel>
    );
};

export default CarouselSlider;