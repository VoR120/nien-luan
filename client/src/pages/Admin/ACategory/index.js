import { makeStyles, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react';
import AddCategoryForm from '../../../component/AddCategoryForm';
import AddProductForm from '../../../component/AddProductForm';
import DeleteCategoryForm from '../../../component/DeleteCategoryForm';
import EditCategoryForm from '../../../component/EditCategoryForm';
import Layout from '../../../component/Layout/Layout';
import { CategoryContext } from '../../../contextAPI/CategoryContext';

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
    const [editOpen, setEditOpen] = useState(false);
    const [image, setImage] = useState('');
    
    const handleOpen = (img) => {
        setImage('http://' + img);
        setImageOpen(true);
    }
    
    let index = 0;
    let parent;
    const getParentName = (parentId, category) => {
        for (let cate of category) {
            const { name, children, _id } = cate;
            if (_id == parentId) {
                parent = name;
                return parent;
            } else {
                if (children.length > 0) {
                    parent = getParentName(parentId, children)
                }
            }
        }
        return parent;
    }

    const getAllCate = (categoryPass, rowsList = []) => {
        for (let cate of categoryPass) {
            const { name, children, parentId, _id } = cate;
            if (parentId == undefined) {
                rowsList.push({
                    _id,
                    id: index + 1,
                    name,
                    parent: '',
                    image: cate.categoryImage,
                    children: children
                })
            } else {
                rowsList.push({
                    _id,
                    id: index + 1,
                    name,
                    parentId: parentId,
                    parent: getParentName(parentId, category.categories),
                    // parent: parentId,
                    image: cate.categoryImage,
                    children: children
                })
            }
            ++index;
            if (children.length > 0) {
                getAllCate(children, rowsList)
            }
        }
        return rowsList;
    }


    const renderCategory = () => {

        let rows = getAllCate(category.categories)

        const columns = [
            { field: 'id', headerName: 'STT', width: 120 },
            { field: 'name', headerName: 'Name', width: 150 },
            {
                field: 'parent',
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
            <AddProductForm />
            <div style={{ height: 430, width: '100%' }}>
                {renderCategory()}
            </div>
        </Layout>
    );
};

export default ACategory;