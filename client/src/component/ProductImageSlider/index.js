import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img from '../../public/img/GAN-11-M-Pro-Mini-3x3-Stickerless-Bright_1024x1024.jpg';

const ProductImageSlider = () => {
    return (
        <div style={{ width: '100%' }}>
            <Carousel
                showStatus={false}
                showArrows={false}
                showIndicators={false}
            >
                <div>
                    <img src={img} />
                </div>
                <div>
                    <img src={img} />
                </div>
                <div>
                    <img src={img} />
                </div>
            </Carousel>
        </div>
    );
};

export default ProductImageSlider;