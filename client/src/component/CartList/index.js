import { Button, Skeleton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clearCart } from '../../action/cartAction';
import { CartContext } from '../../contextAPI/CartContext';
import CartItem from '../CartItem';
import { getCart } from '../../action/cartAction';
import { UserContext } from '../../contextAPI/UserContext';
import { isUserLogin } from '../../action/userAction';


const useStyles = makeStyles(theme => ({
    mainBtn: {
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 40px',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    },
    removeALl: {
        textDecoration: 'underline',
        cursor: 'pointer',
        width: 'fit-content'
    }
}))

const CartList = () => {
    const classes = useStyles();
    const { cart, cartDispatch } = useContext(CartContext);
    const { user, dispatch } = useContext(UserContext);
    const history = useHistory();
    const handleRedirect = () => {
        history.push('/');
    }
    const handleRemoveAll = () => {
        clearCart(cartDispatch);
    }

    return (
        <div className="cart-list">
            {
                !cart.loading ?
                    cart.cartObj.length > 0 ?
                        (<>
                            {cart.cartObj.map((cartItem, index) => {
                                console.log("CartItem: ", cartItem);
                                return <CartItem key={index} cartDispatch={cartDispatch} cartItem={cartItem} />
                            })}
                            <Typography onClick={handleRemoveAll} className={classes.removeALl} variant="h5">Xóa tất cả</Typography>
                        </>
                        ) : (
                            <>
                                <Typography variant="h4">
                                    Giỏ hàng của bạn đang trống
                                </Typography>
                                <Button onClick={handleRedirect} className={classes.mainBtn}>Mua sắm ngay</Button>
                            </>)
                    : (
                        <>
                            <Skeleton variant="rectangular" width="760px" height="163px"></Skeleton>
                        </>
                    )
            }
        </div>
    );
};

export default CartList;