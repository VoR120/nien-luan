import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useState } from 'react';
import AddCategoryForm from '../../../component/AddCategoryForm';
import DeleteCategoryForm from '../../../component/DeleteCategoryForm';
import EditCategoryForm from '../../../component/EditCategoryForm';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { OrderAdminContext } from '../../../contextAPI/OrderAdminContext';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500',
        marginBottom: theme.spacing(4)
    },
    table: {
        height: '450px',
        width: '100%',
        backgroundColor: theme.palette.secondary.light,
        marginTop: '20px',
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


const AOrder = () => {
    const classes = useStyles();
    const { orderAdmin, orderAdminDispatch } = useContext(OrderAdminContext);

    const [rowData] = useState(orderAdmin.orders.map((order, index) => {
        const { paymentStatus, totalAmount, _id } = order;
        return {
            id: index + 1,
            _id,
            totalAmount,
            paymentStatus : paymentStatus === "pending" && "Đang chờ"
        };
    }));

    const [columnDefs] = useState([
        { field: 'id', headerName: 'STT', width: 120 },
        { field: '_id', headerName: 'ID', width: 150 },
        {
            field: 'totalAmount',
            headerName: 'Tổng',
            width: 150
        },
        {
            field: 'paymentStatus',
            headerName: 'Trạng thái',
            width: 150
        },
    ]);

    const gridOptions = {
        defaultColDef: {
            resizable: true,
        },
        columnDefs: columnDefs,
        rowData: rowData,
        defaultColDef: {
            sortable: true,
        },
        pagination: true,
        paginationPageSize: "10",
    }

    return (
        <LayoutAdmin sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Nhóm hàng hóa</Typography>
            <AddCategoryForm />
            <div className={`${classes.table} ag-theme-alpine`}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowHeight={54}
                />
            </div>
        </LayoutAdmin>
    );
};

export default AOrder;