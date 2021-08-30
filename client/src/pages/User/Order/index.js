import { Divider, Link, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import ProcessTab from '../../../component/ProcessTab';
import logo from '../../../public/img/V-logos_transparent.png';

const useStyles = makeStyles(theme => ({
    headerBar: {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: 'none'
    },
    menuBar: {
        padding: '0 48px',
        backgroundColor: theme.palette.secondary.main,
        height: theme.spacing(9),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    logoWrapper: {
        height: '100%'
    },
    logo: {
        height: '100%'
    },
}))

const Order = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.headerBar}>
                <header className={classes.menuBar}>
                    <div className={classes.logoWrapper}>
                        <Link href="/">
                            <img className={classes.logo} src={logo} alt="" />
                        </Link>
                    </div>
                </header>
            </AppBar>
            <Divider />
            <div style={{ margin: '32px 48px' }}>
                <ProcessTab />
            </div>
        </div>
    );
};

export default Order;