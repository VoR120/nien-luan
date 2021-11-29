import { Paper, TableContainer, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useContext, useState } from 'react';
import AddCategoryForm from '../../../component/AddCategoryForm';
import DeleteCategoryForm from '../../../component/DeleteCategoryForm';
import EditCategoryForm from '../../../component/EditCategoryForm';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import { CategoryContext } from '../../../contextAPI/CategoryContext';
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


const ACategory = () => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);

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
                    children: children
                })
            } else {
                rowsList.push({
                    _id,
                    id: index + 1,
                    name,
                    parentId: parentId,
                    parent: getParentName(parentId, category.categories),
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

    const [rows] = useState(getAllCate(category.categories));

    const [columns] = useState([
        { field: 'id', title: 'STT', width: 120 },
        { field: 'name', title: 'Name', width: 150 },
        {
            field: 'parent',
            title: 'Category',
            width: 150
        },
        {
            field: 'button',
            title: 'Button',
            width: 150,
            render: (params) => {
                const { name, parentId, _id } = params
                return (
                    <>
                        <DeleteCategoryForm form={{ name, _id }} />
                        <EditCategoryForm form={{ parentId, name, _id }} />
                    </>
                )
            }
        },
    ]);

    return (
        <LayoutAdmin sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Nhóm hàng hóa</Typography>
            <AddCategoryForm />
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
                    isLoading={category.loading}
                />
            </TableContainer>
        </LayoutAdmin>
    );
};

export default ACategory;