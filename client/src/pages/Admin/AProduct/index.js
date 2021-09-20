import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useState } from 'react';
import AddProductForm from '../../../component/AddProductForm';
import DeleteProductForm from '../../../component/DeleteProductForm';
import EditProductForm from '../../../component/EditProductForm';
import ImageZoom from '../../../component/ImageZoom';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { ProductContext } from '../../../contextAPI/ProductContext';

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

    const [rowData] = useState(product.products.map((product, index) => {
        const { _id, name, category, price, quantity, brand, description, weight, size, magnet, productImages } = product;
        return {
            id: index + 1,
            _id,
            name,
            category: category.name,
            categoryId: category._id,
            price, quantity, brand, description, weight, magnet, size,
            image: productImages,
        };
    }));
    const [columnDefs] = useState([
        { field: 'id', headerName: 'STT', width: 120 },
        { field: 'name', headerName: 'Tên', width: 150 },
        {
            field: 'category',
            headerName: 'Danh mục',
            width: 150
        },
        {
            field: 'brand',
            headerName: 'Thương hiệu',
            width: 150
        },
        {
            field: 'image',
            headerName: 'Hình ảnh',
            width: 150,
            cellRendererFramework: (params) => {
                return (
                    <>
                        {
                            params.data.image.length > 0 ? (
                                <ImageZoom images={params.data.image} />
                            )
                                : ''
                        }
                    </>
                )
            }
        },
        {
            field: 'button',
            headerName: 'Chức năng',
            width: 150,
            cellRendererFramework: (params) => {
                const { name, categoryId, _id, image, price, quantity, brand, description, size, weight, magnet } = params.data
                return (
                    <>
                        <DeleteProductForm form={{ name, _id, image }} />
                        <EditProductForm form={{ categoryId, name, _id, image, price, size, quantity, brand, description, weight, magnet }} />
                    </>
                )
            }
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
            <Typography className={classes.title} variant="h3" color="primary">Sản phẩm</Typography>
            <AddProductForm />
            <div className={`${classes.table} ag-theme-alpine`}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowHeight={54}
                />
            </div>
        </LayoutAdmin>
    );
};

export default AProduct;