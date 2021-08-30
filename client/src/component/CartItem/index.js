import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import img from '../../public/img/GAN-11-M-Pro-Mini-3x3-Stickerless-Bright_1024x1024.jpg'

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: '40px'
    },
    img: {
        width: '100%',
    },
    content: {
        marginLeft: theme.spacing(4)
    },
    name: {
        fontWeight: '500',
        marginBottom: '20px'
    },
    price: {
        marginBottom: '20px'
    },
    quantitySpan: {
        display: 'flex',
        alignItem: 'center',
    },
    number: {
        width: theme.spacing(8),
        marginLeft: theme.spacing(2),
    }
}))

const CartItem = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Grid item xs={4}>
                <img className={classes.img} src={img} alt={img} />
            </Grid>
            <Grid item xs={8}>
                <div className={classes.content}>
                    <Typography className={classes.name}>GAN 11 Pro M 3x3</Typography>
                    <Typography className={classes.price}>1.000.000 VND</Typography>
                    <div className={classes.quantitySpan}>
                        <Typography className={classes.price}>Số lượng: </Typography>
                        <TextField defaultValue={1} size="small" type="number" className={classes.number} />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default CartItem;