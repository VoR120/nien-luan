import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useEffect, useState } from 'react';
import AddProductForm from '../../../component/AddProductForm';
import DeleteProductForm from '../../../component/DeleteProductForm';
import EditProductForm from '../../../component/EditProductForm';
import ImageZoom from '../../../component/ImageZoom';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { ProductContext } from '../../../contextAPI/ProductContext';
import MaterialTable from '@material-table/core';

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
    image: {
        height: '52px',
        padding: '2px 0',
        cursor: 'pointer'
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
    zoomImage: {
        height: '100%'
    }
}))



const AProduct = () => {
    const classes = useStyles();
    const { product, productDispatch } = useContext(ProductContext);

    const [rows, setRows] = useState(product.products.map((product, index) => {
        const { _id, name, category, price, quantity, brand, description, weight, size, magnet, productImages } = product;
        return {
            id: index + 1,
            _id,
            name,
            price,
            quantity,
            category: category.name,
            categoryId: category._id,
            price, quantity, brand, description, weight, magnet, size,
            image: productImages,
        };
    }));
    const [columns] = useState([
        { field: 'id', title: 'STT', width: 50 },
        { field: 'name', title: 'Tên', width: 200 },
        {
            field: 'category',
            title: 'Danh mục',
            width: 150
        },
        {
            field: 'brand',
            title: 'Thương hiệu',
            width: 150
        },
        {
            field: 'price',
            title: 'Giá',
            width: 150
        },
        {
            field: 'quantity',
            title: 'Kho',
            width: 150
        },
        {
            field: 'image',
            title: 'Hình ảnh',
            width: 150,
            render: (params) => {
                console.log(params);
                return (
                    <>
                        {
                            params.image.length > 0 ? (
                                <ImageZoom images={params.image} />
                            )
                                : ''
                        }
                    </>
                )
            }
        },
        {
            field: 'button',
            title: 'Chức năng',
            width: 150,
            render: (params) => {
                const { name, categoryId, _id, image, price, quantity, brand, description, size, weight, magnet } = params
                return (
                    <>
                        <DeleteProductForm form={{ name, _id, image }} />
                        <EditProductForm form={{ categoryId, name, _id, image, price, size, quantity, brand, description, weight, magnet }} />
                    </>
                )
            }
        },
    ]);

    return (
        <LayoutAdmin sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Sản phẩm</Typography>
            <AddProductForm />
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
                    isLoading={product.loading}
                />
            </TableContainer>
        </LayoutAdmin>
    );
};

export default AProduct;