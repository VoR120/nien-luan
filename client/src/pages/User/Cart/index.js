import { Button, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import CartList from '../../../component/CartList';
import Layout from '../../../component/Layout';
import OrderSummary from '../../../component/OrderSummary';
import { isUserLogin } from '../../../action/userAction';
import { getCart } from '../../../action/cartAction';
import { CartContext } from '../../../contextAPI/CartContext';
const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '3px',
        marginBottom: theme.spacing(5),
    },
    mainBtn: {
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 0',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    }
}))

const Cart = () => {
    const history = useHistory();
    const classes = useStyles();
    const { cart, cartDispatch } = useContext(CartContext);

    const handleRedirect = () => {
        history.push('/order')
    }

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/cart"} content={"Giỏ hàng"} />
            <div style={{ padding: '0 48px' }}>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10} >
                        <Typography className={classes.header} variant="h3" color="initial">Giỏ hàng</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <CartList cart={cart} cartDispatch={cartDispatch} />
                            </Grid>
                            <Grid item xs={4}>
                                <OrderSummary />
                                <Button onClick={handleRedirect} className={classes.mainBtn} fullWidth>Tiến hành đặt hàng</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </div>
        </Layout>
    );
};

export default Cart;