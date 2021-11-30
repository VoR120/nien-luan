import { circularProgressClasses, Grid, Paper, Skeleton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { cancelOrder, getOrder, updateOrder } from '../../../action/orderAction';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import { OrderContext } from '../../../contextAPI/OrderContext'
import NumberFormat from 'react-number-format';
import RatingForm from '../../../component/RatingForm';
import { OrderAdminContext } from '../../../contextAPI/OrderAdminContext';
import { ProductContext } from '../../../contextAPI/ProductContext';
import { getAllProduct } from '../../../action/productAction';

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
    const { product, productDispatch } = useContext(ProductContext);
    const [open, setOpen] = useState(false);
    const [deleteArr, setDeleteArr] = useState([]);

    const checkIsDeteted = (id, item) => {
        const p = product.products.filter(el => el._id == id)
        return !p.length
    }

    useEffect(() => {
        // getAllProduct(productDispatch)
        getOrder(orderDispatch);
    }, [])

    const handleCancelOrder = async (data) => {
        console.log(data);
        const res = await cancelOrder({ id: data._id }, "cancelled")
        if (res.status == 200)
            getOrder(orderDispatch);
    }

    useEffect(() => {
        if (order.orders.length > 0) {
            order.orders.map((item, index) => {
                item.items.map(el => {
                    const r = checkIsDeteted(el.productId._id)
                    if (r) {
                        let newArr = [...deleteArr];
                        newArr[index] = true
                        setDeleteArr(newArr);
                    }
                })
            })
        }
    }, [order.orders])

    useEffect(() => {
        console.log(deleteArr)
    }, [deleteArr])

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/myorder"} content={"Đơn hàng"} />
            <Grid container>
                <Grid item sm={1} />

                <Grid item sm={10} >
                    <Typography className={classes.header} variant="h3" color="initial">Đơn hàng</Typography>
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container>
                            <Grid item container sm={4}>
                                <Grid item sm={6}>
                                    Hình ảnh
                                </Grid>
                                <Grid item sm={6}>
                                    Chi tiết
                                </Grid>
                            </Grid>
                            <Grid item sm={4}>
                                Thông tin đặt hàng
                            </Grid>
                            <Grid item sm={1.5}>
                                Trạng thái
                            </Grid>
                            <Grid item sm={1.5}>
                                Tổng giá trị đơn hàng
                            </Grid>
                            <Grid item sm={1}>
                            </Grid>
                        </Grid>
                    </Paper>
                    {order.loading ?
                        (<Skeleton height="118px" variant="rectangular" />)
                        :
                        order.orders.length > 0 ?
                            order.orders.map((item, index) => {
                                console.log(item);
                                return (
                                    <Paper key={index} variant="outlined" className={classes.paper}>
                                        <Grid container>
                                            <Grid item alignItems="center" container sm={4}>
                                                {item.items.map(i => {
                                                    return (
                                                        <>
                                                            <Grid item height="100px" xs={6}>
                                                                <img className={classes.img} src={i.productId.productImages[0].url} alt="product" />
                                                            </Grid>
                                                            <Grid item sm={6}>
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
                                            {deleteArr[index] ?
                                                <Grid item sm={8}>
                                                    <Typography color="red">Một trong các sản phẩm của đơn hàng này đã bị xóa</Typography>
                                                </Grid>
                                                :
                                                <>
                                                    <Grid item sm={4} style={{ marginTop: 14 }}>
                                                        <Typography>Họ tên: {item.address.name}</Typography>
                                                        <Typography>Số điện thoại: {item.address.phoneNumber}</Typography>
                                                        <Typography>Địa chỉ: {item.address.address + ", " + item.address.district + ", " + item.address.province}</Typography>
                                                    </Grid>
                                                    <Grid item style={{ marginTop: 14 }} sm={1.5}>
                                                        <span style={{ color: getColor(getOrderStatus(item.orderStatus)) }}>
                                                            {getStatus(getOrderStatus(item.orderStatus))}
                                                        </span>
                                                    </Grid>
                                                    <Grid item style={{ marginTop: 14 }} sm={1.5}>
                                                        <NumberFormat value={item.totalAmount} displayType="text" thousandSeparator={true} suffix="₫" />
                                                    </Grid>
                                                    <Grid item style={{ marginTop: 14 }} sm={1}>
                                                        {
                                                            item.paymentStatus == "completed" &&
                                                            <RatingForm products={item.items} />
                                                        }
                                                        {
                                                            (item.paymentStatus == "cancelled") &&
                                                            <Button style={{ cursor: 'none !important' }} style={{ margin: '2px 0px' }} color="error" variant="outlined">Đã hủy</Button>
                                                        }

                                                        {
                                                            item.paymentStatus == "pending" &&
                                                            <Button onClick={() => handleCancelOrder(item)} style={{ margin: '2px 0px' }} color="error" variant="contained">Hủy đơn</Button>
                                                        }
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                    </Paper>
                                )
                            })
                            :
                            <Typography variant="h4" marginTop="40px" textAlign="center">Bạn chưa mua đơn hàng nào</Typography>
                    }
                </Grid>

                <Grid item sm={1} />
            </Grid>
        </Layout>
    );
};

export default MyOrder;