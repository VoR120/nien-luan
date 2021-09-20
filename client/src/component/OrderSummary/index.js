import { Divider, Paper, Skeleton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { CartContext } from '../../contextAPI/CartContext';

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
    const classes = useStyles();
    const { cart } = useContext(CartContext);
    const { province } = props;
    const [deliveryPrice, setDeliveryPrice] = useState(30000);
    const sumPrice = cart.cartObj.reduce((sum, next) => {
        return sum + next.price;
    }, 0);

    useEffect(() => {
        if (province == "92" || sumPrice > 300000) {
            setDeliveryPrice(0)
        }
    }, [province])

    return (
        <Paper className={classes.paper} square variant="outlined">
            <Typography className={classes.header} variant="h4">Tóm tắt đơn hàng</Typography>
            {cart.cartObj.map((cartItem, index) => {
                return (
                    <div className={classes.sub}>
                        <span className={classes.sumName}>
                            {!cart.loading ?
                                (<>{cartItem.product.name}</>) :
                                (<><Skeleton variant="rectangular" width="125px" height="20px"></Skeleton></>)}

                        </span>
                        <div className={classes.numberSpan}>
                            <span>
                                {!cart.loading ?
                                    (<>x
                                        {cartItem.quantity}</>) :
                                    (<><Skeleton variant="rectangular" width="20px" height="20px"></Skeleton></>)}
                            </span>
                            <span>
                                {!cart.loading ?
                                    (<><NumberFormat value={cartItem.price} displayType="text" thousandSeparator={true} suffix="₫" /></>) :
                                    (<><Skeleton variant="rectangular" width="67px" height="20px"></Skeleton></>)}

                            </span>
                        </div>
                    </div>
                )
            })}
            {props.delivery ? (
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
            ) : ''
            }
            <Divider />
            <div className={classes.subTotal}>
                <span className={classes.sumName}>Tổng</span>
                {!cart.loading ? (
                    <Typography variant="h3">
                        <NumberFormat className="sum-price" value={sumPrice} displayType="text" thousandSeparator={true} suffix="₫" />
                    </Typography>
                ) : (
                    <Skeleton variant="rectangular" width="107px" height="30px"></Skeleton>
                )
                }
            </div>
        </Paper>
    );
};

export default OrderSummary;