import { Button, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clearCart } from '../../action/cartAction';
import { CartContext } from '../../contextAPI/CartContext';
const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        marginTop: '120px',
    },
    header: {
        marginBottom: '16px',
    },
    mainBtn: {
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 0',
        width: '30%',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    },
    viewBtn: {
        margin: '20px 0',
        padding: '10px 0',
        width: '30%',
        marginRight: '8px'
    }
}))

const OrderSuccess = () => {
    const classes = useStyles();
    const history = useHistory();
    const { cartDispatch } = useContext(CartContext);
    const handleRedirect = () => {
        history.push('/');
    }
    useEffect(() => {
        return () => {
            clearCart(cartDispatch);
        }
    }, [])
    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h2">Bạn đã đặt hàng thành công!</Typography>
            <Typography variant="h5">Đơn hàng sẽ được giao trong khoảng 7 ngày</Typography>
            <Typography variant="h5">Cảm ơn bạn đã tin tưởng và ủng hộ!</Typography>
            <Button variant="outlined" className={classes.viewBtn} fullWidth>Xem đơn hàng</Button>
            <Button onClick={handleRedirect} className={classes.mainBtn} fullWidth>Tiếp tục mua sắm</Button>
        </Paper>
    );
};

export default OrderSuccess;