import { Box, makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DataGrid } from '@material-ui/data-grid';
import React, { useContext, useState } from 'react';
import AddCategoryForm from '../../../component/AddCategoryForm';
import Layout from '../../../component/Layout/Layout';
import { CategoryContext } from '../../../contextAPI/CategoryContext';
import TestImage from '../../../public/img/V-logos.jpeg';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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


const ACategory = () => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const [imageOpen, setImageOpen] = useState(false);
    const [image, setImage] = useState('');
    const handleClose = () => {
        setImageOpen(false);
    }

    const handleOpen = (img) => {
        setImage('http://' + img);
        setImageOpen(true);
    }

    const renderCategory = () => {

        const columns = [
            { field: 'id', headerName: 'STT', width: 120 },
            { field: 'name', headerName: 'Name', width: 150 },
            {
                field: 'button',
                headerName: 'Button',
                width: 150,
                renderCell: (params) => {
                    return (
                        <>
                            <EditIcon className={classes.icon} />
                            <DeleteIcon className={classes.icon} />
                        </>
                    )
                }
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
                                            alt="text-image"
                                        />
                                        <Dialog maxWidth="lg" className={classes.dialog} open={imageOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                                            <div style={{ height: '648px' }}>
                                                <img className={classes.zoomImage} src={image} alt="text-image" />
                                            </div>
                                        </Dialog>
                                    </div>)
                                    : ''
                            }
                        </>
                    )
                }
            }
        ];

        const rows = category.categories.map((cate, index) => {
            const { name } = cate;
            return {
                id: index + 1,
                name,
                image: cate.categoryImage
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
            <Typography className={classes.title} variant="h3" color="primary">Category</Typography>
            <AddCategoryForm />
            <div style={{ height: 440, width: '100%' }}>
                {renderCategory()}
            </div>
        </Layout>
    );
};

export default ACategory;