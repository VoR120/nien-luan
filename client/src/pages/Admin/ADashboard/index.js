import { Divider, makeStyles, Typography } from '@material-ui/core';
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