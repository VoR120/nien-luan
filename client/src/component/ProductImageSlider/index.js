import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProductDetailContext } from '../../contextAPI/ProductDetailContext';
import './styles.css';

const ProductImageSlider = () => {
    const { productDetail } = useContext(ProductDetailContext);
    return (
        <div className="product-detail-slider" style={{ width: '100%' }}>
            <Carousel
                showStatus={false}
                showArrows={false}
                showIndicators={false}
            >
                {productDetail.product.productImages.map(image => {
                    return (
                        <div>
                            <img src={image.url} />
                        </div>
                    )
                })}
            </Carousel>
        </div>
    );
};

export default ProductImageSlider;