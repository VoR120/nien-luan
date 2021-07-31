import { makeStyles, Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
    headerBar: {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: 'none'
    },
    topHeaderBar: {
        padding: '0 48px',
        width: '100%',
        height: theme.spacing(4.5),
        minHeight: '30px',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    menuBar: {
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        height: theme.spacing(9)
    },
    logoWrapper: {
        height: '100%'
    },
    logo: {
        height: '100%'
    }
}))

const AdminHeader = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.headerBar}>
                <Toolbar className={classes.topHeaderBar}>
                    <div className={classes.headerWrapper}>
                        <Typography variant="h4" color="initial">Đăng nhập |</Typography>
                        <Typography variant="h4" color="initial">Đăng ký |</Typography>
                        <Typography variant="h4" color="initial">Giúp đỡ |</Typography>
                    </div>
                </Toolbar>
                <header className={classes.menuBar}>
                    <div className={classes.logoWrapper}>
                        <img className={classes.logo} src={'/img/V-logos_transparent.png'} alt="" />
                    </div>
                </header>
            </AppBar>
        </div>
    );
};

export default AdminHeader;