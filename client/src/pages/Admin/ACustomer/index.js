import MaterialTable from '@material-table/core';
import { Button, Grid, Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useContext, useEffect, useState } from 'react';
import { updateOrder } from '../../../action/orderAction';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { OrderAdminContext } from '../../../contextAPI/OrderAdminContext';
import NumberFormat from 'react-number-format';
import { getAllCustomer } from '../../../action/customerAction';

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
}))

const getDate = (date) => {
    let newDate = new Date(date);
    // const offset = newDate.getTimezoneOffset()
    // newDate = new Date(newDate.getTime() - (offset * 60 * 1000))
    // console.log(newDate.toISOString().split('T')[0]);
    // return newDate.toISOString().split('T')[0]
    return newDate.toLocaleString()
}

const Customer = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [columns] = useState([
        { title: "STT", field: "id", width: 50 },
        { title: "Họ tên", field: "fullName" },
        { title: "Email", field: "email" },
        { title: "Số điện thoại", field: "phoneNumber" },
        { title: "Địa chỉ", field: "address" },
        { title: "Ngày tạo", field: "createdAt" },
    ]);
    const [rows, setRows] = useState([]);

    const getDate = (date) => {
        let newDate = new Date(date);
        return newDate.toLocaleString()
    }

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

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getAllCustomer();
            const newRes = res.map((el, index) => ({ ...el, id: index + 1, createdAt: getDate(el.createdAt) }))
            setRows(newRes);
            setLoading(false)
        }
        fetchAPI();
    }, [])

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
                    isLoading={loading}
                />
            </TableContainer>
        </LayoutAdmin>
    );
};

export default Customer;