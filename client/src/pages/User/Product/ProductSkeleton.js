import { Divider, Grid, Skeleton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyle = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    starrating: {
        alignItems: 'center',
    },
    quantity: {
        marginTop: "50px",
        marginBottom: "50px",
    },
    price: {
        margin: '20px 0px'
    },
    number: {
        width: theme.spacing(8),
        marginRight: theme.spacing(2),
    },
    headerInfo: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: '12px 0',
    },
    description: {
        lineHeight: '1.8rem',
    },
    label: {
        textTransform: 'uppercase',
        fontSize: '0.9rem'
    },
    value: {
        fontSize: '0.9rem'
    },
}))

const ProductSkeleton = () => {
    const classes = useStyle()
    return (
        <Grid item container sm={12} spacing={6}>
            <Grid item sm={6}>
                <Skeleton height="398.5px" variant="rectangular" />
            </Grid>
            <Grid item sm={6}>
                <div height="595px">
                    <Typography className={classes.header} gutterBottom variant="h4" component="h2">
                        <Skeleton />
                    </Typography>
                    <div className={classes.starrating}>
                        <Typography variant="h6" color="textSecondary" component="h2">
                            <Skeleton width="200px" />
                        </Typography>
                    </div>
                    <Typography className={classes.price} variant="h3" component="h2" color="primary">
                        <Skeleton width="300px" />
                    </Typography>
                    <Skeleton variant="rectangular" height="36px" width="300px" className={classes.quantity} />
                    <Divider className={classes.divider} />
                    <Typography className={classes.headerInfo} variant="h5">
                        <Skeleton width="100px" className={classes.description} />
                        <Skeleton width="250px" className={classes.description} />
                        <Skeleton width="250px" className={classes.description} />
                        <Skeleton width="250px" className={classes.description} />
                        <Skeleton width="250px" className={classes.description} />
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default ProductSkeleton;