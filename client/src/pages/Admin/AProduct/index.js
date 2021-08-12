import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../../../component/Layout/Layout';
import { DataGrid } from '@material-ui/data-grid'
import { getAllCategory } from '../../../action/categoryAction';
import { CategoryContext } from '../../../contextAPI/CategoryContext';
import { ProductContext } from '../../../contextAPI/ProductContext';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500'
    },
    table: {
        backgroundColor: theme.palette.secondary.light,
    }
}))


const AProduct = () => {
    const classes = useStyles();
    const { product } = useContext(ProductContext);

    const renderProduct = () => {

        const columns = [
            { field: 'id', headerName: 'STT', width: 120 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'category', headerName: 'Category', width: 150 },
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
            <DataGrid
                className={classes.table}
                rows={rows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
            />
        )
    }

    return (
        <Layout sidebar>
            <Typography className={classes.title} variant="h3" color="primary">Product</Typography>
            <div style={{ height: 400, width: '100%' }}>
                {renderProduct()}
            </div>
        </Layout>
    );
};

export default AProduct;