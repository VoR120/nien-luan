import { Divider, Paper, Skeleton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { AddressContext } from '../../contextAPI/AddressContext';
import { CartContext } from '../../contextAPI/CartContext';
import { UserContext } from '../../contextAPI/UserContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '20px'
    },
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: '20px',
    },
    sub: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '14px 0'
    },
    info: {
        margin: '14px 0'
    },
    subTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
    },
    sumName: {
        maxWidth: '160px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    numberSpan: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '140px',
    }
}))

const OrderSummary = (props) => {
    const { addressChoose, provinceChoose, delivery } = props
    const classes = useStyles();
    const { cart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [deliveryPrice, setDeliveryPrice] = useState(30000)
    const sumPrice = cart.cartObj.reduce((sum, next) => sum + next.price, 0);

    useEffect(() => {
        if (provinceChoose === "Thành phố Hà Nội" || sumPrice >= 300000) {
            setDeliveryPrice(0);
            props.setDeliveryPrice && props.setDeliveryPrice(0);
        } else {
            setDeliveryPrice(30000);
            props.setDeliveryPrice && props.setDeliveryPrice(30000);
        }
    }, [provinceChoose])

    useEffect(() => {
        props.setTotalAmount && props.setTotalAmount(sumPrice + deliveryPrice)
    })

    return (
        <Paper className={classes.paper} square variant="outlined">
            <Typography className={classes.header} variant="h4">Tóm tắt đơn hàng</Typography>
            {addressChoose &&
                (
                    <div className={classes.info}>
                        <Typography>Họ tên: {addressChoose[0].name}</Typography>
                        <Typography>Địa chỉ: {addressChoose[0].address + ", " + addressChoose[0].district + ", " + addressChoose[0].province}</Typography>
                        <Typography>Số điện thoại: {addressChoose[0].phoneNumber}</Typography>
                        <Typography>Email: {user.userDetails.email}</Typography>
                    </div>
                )}
            <Divider />
            {cart.cartObj.map((cartItem, index) => {
                return (
                    <div className={classes.sub}>
                        <span className={classes.sumName}>
                            {cartItem.product.name}
                        </span>
                        <div className={classes.numberSpan}>
                            <span>
                                x
                                {cartItem.quantity}
                            </span>
                            <span>
                                <NumberFormat value={cartItem.price} displayType="text" thousandSeparator={true} suffix="₫" />
                            </span>
                        </div>
                    </div>
                )
            })}
            {delivery && (
                <div className={classes.sub}>
                    <span className={classes.sumName}>Phí vận chuyển</span>
                    <div>
                        {deliveryPrice === 0 ?
                            <span>Miễn phí</span>
                            :
                            <span><NumberFormat value={deliveryPrice} displayType="text" thousandSeparator={true} suffix="₫" /></span>
                        }
                    </div>
                </div>
            )
            }
            <Divider />
            <div className={classes.subTotal}>
                <span className={classes.sumName}>Tổng</span>
                <Typography variant="h3">
                    <NumberFormat className="sum-price" value={delivery ? sumPrice + deliveryPrice : sumPrice} displayType="text" thousandSeparator={true} suffix="₫" />
                </Typography>
            </div>
        </Paper>
    );
};

export default OrderSummary;