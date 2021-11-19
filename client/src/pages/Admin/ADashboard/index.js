import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import LayoutAdmin from '../../../component/LayoutAdmin/LayoutAdmin';
import './style.scss'

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '500'
    },
}))

const ADashboard = () => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        history.push('/product')
    }, [])

    return (
        <LayoutAdmin sidebar>
            <div>
                <Typography className={classes.title} variant="h3" color="initial">Trang quản trị</Typography>
            </div>
        </LayoutAdmin>
    );
};

export default ADashboard;