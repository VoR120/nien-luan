import { Button, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import makeStyles from '@mui/styles/makeStyles';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { removeCartItem, updateCart } from '../../action/cartAction';
import { CartContext } from '../../contextAPI/CartContext';
import img from '../../public/img/GAN-11-M-Pro-Mini-3x3-Stickerless-Bright_1024x1024.jpg';
import { getProductDetail } from '../../action/productAction';

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: '40px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        position: 'relative'
    },
    img: {
        width: '100%',
    },
    content: {
        marginLeft: theme.spacing(4)
    },
    name: {
        fontWeight: '500',
        marginBottom: '20px',
        marginTop: '20px',
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
    },
    xBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer'
    }
}))

const CartItem = (props) => {
    console.log(props);
    const { product, quantity, price, _id } = props.cartItem;
    const [quantityCart, setQuantityCart] = useState(quantity);
    const { cart, cartDispatch } = useContext(CartContext);
    const classes = useStyles();

    const handleRemoveCart = () => {
        removeCartItem(cartDispatch, { _id: product._id });
    }

    const handleChangeUpdate = (e) => {
        setQuantityCart(e.target.value);
        const cartItem = { productUpdate: product, priceUpdate: product.price * e.target.value, quantityUpdate: Number(e.target.value) }
        updateCart(cartDispatch, { cartItem: cartItem });
    }

    return (
        // <Link to="/productdetail/">
        <Grid container className={classes.container}>
            {!cart.loading ? (
                <ClearIcon onClick={handleRemoveCart} className={classes.xBtn} />
            ) : (<LoadingButton className={classes.xBtn} loading></LoadingButton>)
            }
            <Grid item xs={4}>
                <img className={classes.img} src={product.productImages[0].url} alt={img} />
            </Grid>
            <Grid item xs={8}>
                <div className={classes.content}>
                    <Typography className={classes.name}>{product.name}</Typography>
                    <Typography className={classes.price}>
                        <NumberFormat value={product.price} displayType="text" thousandSeparator={true} suffix="₫" />
                    </Typography>
                    <div className={classes.quantitySpan}>
                        <Typography className={classes.price}>Số lượng: </Typography>
                        <TextField value={quantityCart} onChange={handleChangeUpdate} size="small" type="number" className={classes.number} />
                    </div>
                </div>
            </Grid>
        </Grid>
        // </Link>
    );
};

export default CartItem;