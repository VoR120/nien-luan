import { Grid } from '@material-ui/core';
import React from 'react';
import ProductItem from '../ProductItem';

const ProductList = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <ProductItem />
            </Grid>
            <Grid item xs={3}>
                <ProductItem />
            </Grid>
            <Grid item xs={3}>
                <ProductItem />
            </Grid>
            <Grid item xs={3}>
                <ProductItem />
            </Grid>
            <Grid item xs={3}>
                <ProductItem />
            </Grid>
        </Grid>
    );
};

export default ProductList;