import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import CartList from '../../../component/CartList';
import Layout from '../../../component/Layout';
import OrderSummary from '../../../component/OrderSummary';
import { CartContext } from '../../../contextAPI/CartContext';
import { UserContext } from '../../../contextAPI/UserContext';
import './style.scss'
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
    const { user } = useContext(UserContext);

    const handleRedirect = () => {
        history.push('/order')
    }

    return (
        <Layout headfoot>
            <div className="cart-wrapper">
                <BreadcrumbsDiv link={"/cart"} content={"Giỏ hàng"} />
                <div style={{ padding: '0 48px' }}>
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={10} >
                            <Typography className={classes.header} variant="h3" color="initial">Giỏ hàng</Typography>
                            {user.isAuthenticated ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <CartList cart={cart} cartDispatch={cartDispatch} />
                                        </Grid>
                                        <Grid className="order-btn" item xs={4}>
                                            <OrderSummary />
                                            <Button disabled={cart.cartObj.length == 0} onClick={handleRedirect} className={classes.mainBtn} fullWidth>Tiến hành đặt hàng</Button>
                                        </Grid>
                                    </Grid>
                                ) :
                                (
                                    <Typography>Bạn chưa đăng nhập!  <NavLink to="/login">Đăng nhập</NavLink></Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;