import { Grid, Link } from '@material-ui/core';
import React from 'react';
import ProductItem from '../ProductItem';

const ProductContent = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3} md={4}>
                <Link href="/productdetail">
                    <ProductItem />
                </Link>
            </Grid>
            <Grid item xs={12} lg={3} md={4}>
                <ProductItem />
            </Grid>
            <Grid item xs={12} lg={3} md={4}>
                <ProductItem />
            </Grid>
            <Grid item xs={12} lg={3} md={4}>
                <ProductItem />
            </Grid>
        </Grid>
    );
};

export default ProductContent;