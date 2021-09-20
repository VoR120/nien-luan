import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from 'react-router-dom';
import ProductItem from '../ProductItem';


const useStyles = makeStyles(theme => ({
    item: {
        padding: '0 8px',
    },
}))

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const ProductContent = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            // ssr={true} //means to render carousel on server-side
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={props.deviceType}
            dotListClass={classes.dotList}
            itemClass={classes.item}
        >
            {props.products.map((p, index) => {
                return (
                    <ProductItem key={index} products={p} />
                )
            })}
        </Carousel>
    )
}

export default ProductContent;