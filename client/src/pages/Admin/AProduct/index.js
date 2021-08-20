import { makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { DataGrid } from '@material-ui/data-grid';
import React, { useContext, useState } from 'react';
import AddCategoryForm from '../../../component/AddCategoryForm';
import DeleteCategoryForm from '../../../component/DeleteCategoryForm';
import EditCategoryForm from '../../../component/EditCategoryForm';
import Layout from '../../../component/Layout/Layout';
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
    const [imageOpen, setImageOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [image, setImage] = useState('');
    
    const handleOpen = (img) => {
        setImage('http://' + img);
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
                                params.row.image ? (
                                    <div style={{ height: '100%' }}>
                                        <img
                                            onClick={() => handleOpen(params.row.image)}
                                            className={classes.image}
                                            src={'http://' + params.row.image}
                                            alt="text"
                                        />
                                        <Dialog
                                            maxWidth="lg"
                                            className={classes.dialog}
                                            open={imageOpen}
                                            onClose={() => setImageOpen(false)} aria-labelledby="form-dialog-title"
                                        >
                                            <div style={{ height: '646px' }}>
                                                <img className={classes.zoomImage} src={image} alt="text" />
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
                    const { name, parentId, _id } = params.row
                    return (
                        <>
                            <DeleteCategoryForm form={{ name, _id }} />
                            <EditCategoryForm form={{ parentId, name, _id }} />
                        </>
                    )
                }
            },
        ];

        const rows = product.products.map((product, index) => {
            const { name, category } = product;
            return {
                id: index + 1,
                name,
                category: category.name
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
                />
            </>
        )
    }


    return (
        <Layout sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Product</Typography>
            <AddCategoryForm />
            <div style={{ height: 430, width: '100%' }}>
                {renderCategory()}
            </div>
        </Layout>
    );
};

export default AProduct;