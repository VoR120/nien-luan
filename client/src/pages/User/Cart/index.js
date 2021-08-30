import React from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, makeStyles } from '@material-ui/core';
import CartList from '../../../component/CartList';
import OrderSummary from '../../../component/OrderSummary';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '3px',
        marginBottom: '40px',
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
                                <CartList />
                            </Grid>
                            <Grid item xs={4}>
                                <OrderSummary />
                                <Button onClick={() => history.push('/order')} className={classes.mainBtn} fullWidth>Tiến hành đặt hàng</Button>
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