import { circularProgressClasses, Grid, Paper, Skeleton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { getOrder } from '../../../action/orderAction';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import { OrderContext } from '../../../contextAPI/OrderContext'
import NumberFormat from 'react-number-format';
import RatingForm from '../../../component/RatingForm';

const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '3px',
        marginBottom: theme.spacing(5),
    },
    img: {
        height: '100%',
        padding: '4px'
    },
    paper: {
        padding: theme.spacing(1),
        marginBottom: '8px'
    }
}))

const getOrderStatus = (data) => {
    let status;
    data.map(el => {
        if (el.isCompleted)
            status = el.type
    })
    return status;
}

const getStatus = (stt) => {
    const statusObj = {
        ordered: "Đã đặt hàng",
        packed: "Đã xác nhận",
        shipped: "Đang giao",
        delivered: "Đã giao hàng",
    }
    return statusObj[stt]
}

const getColor = (color) => {
    const statusObj = {
        ordered: "#FFE800",
        packed: "orange",
        shipped: "blue",
        delivered: "green"
    }
    return statusObj[color]
}


const MyOrder = () => {
    const classes = useStyles();
    const { order, orderDispatch } = useContext(OrderContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getOrder(orderDispatch);
    }, [])

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/myorder"} content={"Đơn hàng"} />
            <Grid container>
                <Grid item sm={2} />

                <Grid item sm={8} >
                    <Typography className={classes.header} variant="h3" color="initial">Đơn hàng</Typography>
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container>
                            <Grid item container sm={6}>
                                <Grid item sm={4}>
                                    Hình ảnh
                                </Grid>
                                <Grid item sm={8}>
                                    Chi tiết
                                </Grid>
                            </Grid>
                            <Grid item sm={2}>
                                Trạng thái
                            </Grid>
                            <Grid item sm={2}>
                                Tổng giá trị đơn hàng
                            </Grid>
                            <Grid item sm={2}>
                            </Grid>
                        </Grid>
                    </Paper>
                    {order.loading ?
                        (<Skeleton height="118px" variant="rectangular" />) :

                        order.orders.map(item => {
                            return (
                                <Paper variant="outlined" className={classes.paper}>
                                    <Grid container>
                                        <Grid item alignItems="center" container sm={6}>
                                            {item.items.map(i => {
                                                return (
                                                    <>
                                                        <Grid item height="100px" xs={4}>
                                                            <img className={classes.img} src={i.productId.productImages[0].url} alt="product" />
                                                        </Grid>
                                                        <Grid item sm={8}>
                                                            <Typography>{i.productId.name}</Typography>
                                                            <Typography>Số lượng: {i.quantity}</Typography>
                                                            <Typography>
                                                                <NumberFormat value={i.price} displayType="text" thousandSeparator={true} suffix="₫" />
                                                            </Typography>
                                                        </Grid>
                                                    </>
                                                )
                                            })}
                                        </Grid>
                                        <Grid item style={{ marginTop: 14 }} sm={2}>
                                            <span style={{ color: getColor(getOrderStatus(item.orderStatus)) }}>
                                                {getStatus(getOrderStatus(item.orderStatus))}
                                            </span>
                                        </Grid>
                                        <Grid item style={{ marginTop: 14 }} sm={2}>
                                            <NumberFormat value={item.totalAmount} displayType="text" thousandSeparator={true} suffix="₫" />
                                        </Grid>
                                        <Grid item style={{ marginTop: 14 }} sm={2}>
                                            {
                                                item.paymentStatus == "completed" &&
                                                <>
                                                    <RatingForm products={item.items} />
                                                    {/* <Button style={{ margin: '2px 0px' }} variant="outlined">Mua lại</Button> */}
                                                </>
                                            }
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        })}
                </Grid>

                <Grid item sm={2} />
            </Grid>
        </Layout>
    );
};

export default MyOrder;