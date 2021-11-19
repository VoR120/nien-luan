import MaterialTable from '@material-table/core';
import { Button, Grid, Paper, TableContainer, Typography, Dialog, DialogActions, DialogTitle, DialogContent, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useContext, useEffect, useState } from 'react';
import { getAllOrder, updateOrder } from '../../../action/orderAction';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { OrderAdminContext } from '../../../contextAPI/OrderAdminContext';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500',
        marginBottom: theme.spacing(4)
    },
    table: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: '18px',
    },
    icon: {
        cursor: 'pointer',
        marginRight: theme.spacing(1),
    },
    flexContainer: {
        display: 'flex'
    },
    flexItem: {
        width: '50%'
    },
    divider: {
        margin: '8px 0'
    },
    dialog: {
        marginTop: 8
    }
}))

const getDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleString()
}

const AOrder = () => {
    const classes = useStyles();
    const { orderAdmin, orderAdminDispatch } = useContext(OrderAdminContext);
    const [open, setOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null)

    const handleSubmit = (data) => {
        console.log(data);
        if (getOrderStatus(data.orderStatus) == "delivered") {
            setOrderDetail(data);
            setOpen(true)
        } else
            updateOrder(orderAdminDispatch, data)
    }

    const handleClose = () => {
        setOpen(false)
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

    const getStep = (s) => {
        const step = {
            ordered: "Xác nhận",
            packed: "Giao hàng",
            shipped: "Xác nhận đã giao",
            delivered: "Xem chi tiết"
        }
        return step[s]
    }

    const getOrderStatus = (data) => {
        let status;
        data.map(el => {
            if (el.isCompleted)
                status = el.type
        })
        return status;
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

    const [columns] = useState([
        { title: 'STT', field: 'id', width: 20 },
        { title: 'Khách hàng', field: 'fullName', maxWidth: 500 },
        {
            title: 'Đơn hàng', field: 'items', maxWidth: 500,
            render: (params) => {
                return (
                    <>
                        {params.items.map((el, index) =>
                            <Grid container key={index} >
                                <Grid item flex={1}>
                                    {el.productId.name}
                                </Grid>
                                <Grid item sx={2}>
                                    x {el.quantity}
                                </Grid>
                            </Grid>
                        )}
                    </>
                )
            }
        },
        { title: "Email", field: "email" },
        {
            title: 'Tổng', field: 'totalAmount', width: 130, align: 'right',
            render: (params) => <NumberFormat value={params.totalAmount} displayType="text" thousandSeparator={true} suffix="₫" />
        },
        { title: 'Ngày đặt', field: 'createdAt', width: 150, align: 'right' },
        {
            title: 'Trạng thái', field: 'paymentStatus', width: 140,
            render: (params) => {
                return (
                    <span style={{ color: getColor(getOrderStatus(params.orderStatus)) }}>
                        {getStatus(getOrderStatus(params.orderStatus))}
                    </span>
                )
            }
        },
        {
            title: 'Xử lý', field: 'action', width: 150,
            render: (params) => {
                return (
                    <Button
                        onClick={() => handleSubmit(params)}
                        size="small"
                        variant="contained" color="info"
                    >
                        {getStep(getOrderStatus(params.orderStatus))}
                    </Button>
                )
            }
        },
    ]);
    const [rows, setRows] = useState(orderAdmin.orders.map((order, index) => {
        const { paymentStatus, totalAmount, _id, items, createdAt, user, orderStatus } = order;
        return {
            id: index + 1,
            _id,
            items,
            orderStatus,
            fullName: user.fullName,
            email: user.email,
            totalAmount,
            createdAt: getDate(createdAt),
            paymentStatus
        };
    }));

    // useEffect(() => {
    //     getAllOrder(orderAdminDispatch);
    // }, [])

    // useEffect(() => {
    //     const list = orderAdmin.orders.map((order, index) => {
    //         console.log
    //         const { paymentStatus, totalAmount, _id, items, createdAt } = order;
    //         return {
    //             id: index + 1,
    //             items,
    //             totalAmount,
    //             paymentStatus: paymentStatus === "pending" && "Đang chờ"
    //         };
    //     })
    //     setRows(list);
    // }, [])

    return (
        <LayoutAdmin sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Đơn hàng</Typography>
            <TableContainer style={{ maxWidth: "1170px", }} >
                <MaterialTable
                    components={{
                        Container: (props) => <Paper
                            {...props}
                            className={classes.table}
                            variant="outlined"
                        />
                    }}
                    title={""}
                    columns={columns}
                    data={rows}
                    options={{
                        padding: 'normal'
                    }}
                    isLoading={orderAdmin.loading}
                />
            </TableContainer>
            {orderDetail &&
                <Dialog PaperProps={{ style: { minWidth: '900px' } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Thông tin đơn hàng</DialogTitle>
                    <DialogContent >
                        <Grid container spacing={3} className={classes.dialog}>
                            <Grid item xs={6} container spacing={1}>
                                <b>Thông tin khách hàng</b>
                                <Grid item xs={12} container >
                                    <Grid item xs={5}>
                                        Họ tên
                                    </Grid>
                                    <Grid item xs={7}>
                                        {orderDetail.fullName}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid item xs={5}>
                                        Email
                                    </Grid>
                                    <Grid item xs={7}>
                                        {orderDetail.email}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>
                                <b>Thông tin đơn hàng</b>
                                {
                                    orderDetail.items.map((el, index) =>
                                        <Grid item xs={12} key={index} container>
                                            <Grid item flex={1}>
                                                {el.productId.name}
                                            </Grid>
                                            <Grid item xs={2}>
                                                x {el.quantity}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <NumberFormat value={el.price} displayType="text" thousandSeparator={true} suffix="₫" />
                                            </Grid>
                                        </Grid>
                                    )
                                }
                                <Grid item xs={12} container>
                                    <Grid item flex={1}>
                                        Tổng
                                    </Grid>
                                    <Grid item xs={3}>
                                        <NumberFormat value={orderDetail.totalAmount} displayType="text" thousandSeparator={true} suffix="₫" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container spacing={1}>
                                <b>Nhật ký giao hàng</b>
                                {
                                    orderDetail.orderStatus.map((el, index) =>
                                        <Grid item xs={12} key={index} container>
                                            <Grid item xs={5}>
                                                {getStatus(el.type)}
                                            </Grid>
                                            <Grid item xs={7}>
                                                {getDate(el.date)}
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" >
                            Thoát
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </LayoutAdmin>
    );
};

export default AOrder;