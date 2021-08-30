import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles(theme => ({
    label: {
        textTransform: 'uppercase',
        fontSize: '0.9rem'
    },
    value: {
        fontSize: '0.9rem'
    },
    link: {
        color: theme.palette.primary.main,
        '&:hover' :{
            textDecorationStyle: 'underline'
        }
    }
}))

const ProductMeta = (props) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={3}>
                <Typography className={classes.label}>{props.label}</Typography>
            </Grid>
            <Grid item>
                <Link className={classes.link} href="#">
                    <Typography>{props.value}</Typography>
                </Link>
            </Grid>
        </Grid>
    );
};

export default ProductMeta;