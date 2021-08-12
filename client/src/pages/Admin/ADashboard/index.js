import { Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../../../component/Layout/Layout';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500'
    },
}))
const ADashboard = () => {
    const classes = useStyles();
    return (
        <Layout sidebar>
            <div>
                <Typography className={classes.title} variant="h3" color="initial">Dashboard</Typography>
            </div>
        </Layout>
    );
};

export default ADashboard;