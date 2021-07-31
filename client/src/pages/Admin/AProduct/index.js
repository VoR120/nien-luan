import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../../component/Layout/Layout';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500'
    },
}))
const AProduct = () => {
    const classes = useStyles();
    return (
        <Layout sidebar>
            <Typography className={classes.title} variant="h3" color="initial">Product</Typography>
        </Layout>
    );
};

export default AProduct;