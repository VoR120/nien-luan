import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    label: {
        textTransform: 'uppercase',
        fontSize: '0.9rem'
    },
    value: {
        fontSize: '0.9rem'
    },
}))

const ProductMeta = (props) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={3}>
                <Typography className={classes.label}>{props.label}</Typography>
            </Grid>
            <Grid item>
                <Typography>{props.value}</Typography>
            </Grid>
        </Grid>
    );
};

export default ProductMeta;