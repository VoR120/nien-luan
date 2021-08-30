import { Grid } from '@material-ui/core';
import React from 'react';
import img from '../../public/img/GAN-11-M-Pro-Mini-3x3-Stickerless-Bright_1024x1024.jpg'
import CartItem from '../CartItem';

const CartList = () => {
    return (
        <div className="cart-list">
            <CartItem />
            <CartItem />
            <CartItem />
        </div>
    );
};

export default CartList;