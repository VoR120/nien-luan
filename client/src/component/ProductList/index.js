import { Grid } from '@mui/material';
import React from 'react';
import ProductItem from '../ProductItem';

const ProductList = (props) => {
    return (
        <Grid container spacing = { 2} >
        {
            props.product.map((p, index) => {
                return (
                    <Grid item xs={3}>
                        <ProductItem key={index} products={p} />
                    </Grid>
                )
            })
        }
        </Grid>
    );
};

export default ProductList;