import { makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { DataGrid } from '@material-ui/data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { getAllProduct } from '../../../action/productAction';
import AddProductForm from '../../../component/AddProductForm';
import DeleteProductForm from '../../../component/DeleteProductForm';
import EditProductForm from '../../../component/EditProductForm';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { CategoryContext } from '../../../contextAPI/CategoryContext';
import { ProductContext } from '../../../contextAPI/ProductContext';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500',
        marginBottom: theme.spacing(4)
    },
    table: {
        backgroundColor: theme.palette.secondary.light,
    },
    image: {
        height: '100%',
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
    const { category, categoryDispatch } = useContext(CategoryContext);
    const [imageOpen, setImageOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [image, setImage] = useState([]);

    const handleOpen = (img) => {
        // setImage('http://' + img);
        setImage(img)
        setImageOpen(true);
    }

    const renderCategory = () => {

        const columns = [
            { field: 'id', headerName: 'STT', width: 120 },
            { field: 'name', headerName: 'Name', width: 150 },
            {
                field: 'category',
                headerName: 'Category',
                width: 150
            },
            {
                field: 'image',
                headerName: 'Image',
                width: 150,
                renderCell: (params) => {
                    return (
                        <>
                            {
                                params.row.image.length > 0 ? (
                                    <div style={{ height: '100%' }}>
                                        <img
                                            onClick={() => handleOpen(params.row.image)}
                                            className={classes.image}
                                            src={params.row.image[0].url}
                                            alt="text"
                                        />
                                        <Dialog
                                            maxWidth="lg"
                                            className={classes.dialog}
                                            open={imageOpen}
                                            onClose={() => setImageOpen(false)} aria-labelledby="form-dialog-title"
                                        >
                                            <div style={{ height: '646px', display: 'flex' }}>
                                                {image.map(i => {
                                                    return <img className={classes.zoomImage} src={i.url} alt="text" />
                                                })}
                                            </div>
                                        </Dialog>
                                    </div>)
                                    : ''
                            }
                        </>
                    )
                }
            },
            {
                field: 'button',
                headerName: 'Button',
                width: 150,
                renderCell: (params) => {
                    const { name, categoryId, _id, image } = params.row
                    return (
                        <>
                            <DeleteProductForm form={{ name, _id, image }} />
                            <EditProductForm form={{ categoryId, name, _id, image }} />
                        </>
                    )
                }
            },
        ];

        const rows = product.products.map((product, index) => {
            const { _id, name, category, productImages } = product;
            return {
                id: index + 1,
                _id,
                name,
                category: category.name,
                categoryId: category._id,
                image: productImages,
            };
        });
        return (
            <>
                <DataGrid
                    className={classes.table}
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSize={5}
                    disableSelectionOnClick
                    rowHeight={64}
                    loading={rows.length === 0}
                />
            </>
        )
    }


    return (
        <LayoutAdmin sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Product</Typography>
            <AddProductForm />
            <div style={{ height: 430, width: '100%' }}>
                {renderCategory()}
            </div>
        </LayoutAdmin>
    );
};

export default AProduct;