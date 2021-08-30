import { Link, makeStyles, Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import logo from '../../public/img/V-logos_transparent.png'
import DropdownMenu from '../DropdownMenu';
import RightHeaderBar from '../RightHeaderBar';

const useStyles = makeStyles(theme => ({
    headerBar: {
        backgroundColor: theme.palette.secondary.dark,
        boxShadow: 'none'
    },
    topHeaderBar: {
        padding: '0 48px',
        height: theme.spacing(4.5),
        minHeight: '30px',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    menuBar: {
        padding: '0 48px',
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
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
    typo: {
        borderRight: '1px solid #212121',
        fontSize: '0.9rem',
        padding: '0 8px',
        '&:last-child': {
            borderRight: 'none',
        }
    }
}))

const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.headerBar}>
                <Toolbar className={classes.topHeaderBar}>
                    <div className={classes.headerWrapper}>
                        <Typography className={classes.typo} color="primary">Đăng nhập</Typography>
                        <Typography className={classes.typo} color="primary">Đăng ký</Typography>
                        <Typography className={classes.typo} color="primary">Giúp đỡ</Typography>
                    </div>
                </Toolbar>
                <header className={classes.menuBar}>
                    <div className={classes.logoWrapper}>
                        <Link href="/">
                            <img className={classes.logo} src={logo} alt="" />
                        </Link>
                    </div>
                    <DropdownMenu />
                    <RightHeaderBar />
                </header>
            </AppBar>
        </div>
    );
};

export default Header;