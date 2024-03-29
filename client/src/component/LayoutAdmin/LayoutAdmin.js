import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import AdminDrawer from '../AdminDrawer';
import AdminHeader from '../AdminHeader';
import CustomizedSnackbars from '../MySnackbar'

const useStyle = makeStyles(theme => ({
    content: {
        backgroundColor: theme.palette.secondary.dark,
        padding: theme.spacing(6),
    },
}))

const LayoutAdmin = (props) => {
    const classes = useStyle();
    return (
        <>
            {props.sidebar ? (
                <Grid container>
                    <Grid item xs={12} sm={2}>
                        <AdminDrawer />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <AdminHeader />
                        <div className={classes.content}>
                            {props.children}
                        </div>
                    </Grid>
                </Grid>
            ) : (
                props.children
            )
            }
            <CustomizedSnackbars />
        </>
    );
};

export default LayoutAdmin;