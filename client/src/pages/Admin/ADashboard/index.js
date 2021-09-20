import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500'
    },
}))
const ADashboard = () => {
    const classes = useStyles();
    return (
        <LayoutAdmin sidebar>
            <div>
                <Typography className={classes.title} variant="h3" color="initial">Dashboard</Typography>
            </div>
        </LayoutAdmin>
    );
};

export default ADashboard;