import { Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { CartContext } from '../../contextAPI/CartContext';
import logo from '../../public/img/V-logos_transparent.png';
import DropdownMenu from '../DropdownMenu';
import RightHeaderBar from '../RightHeaderBar';
import { UserContext } from '../../contextAPI/UserContext';
import { adminLogout } from '../../action/authAction';
import { userLogout } from '../../action/userAction';

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
        height: '100%',
        cursor: 'pointer'
    },
    logo: {
        height: '100%'
    },
    typo: {
        cursor: 'pointer',
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
    const { cart } = useContext(CartContext);
    const { user, dispatch } = useContext(UserContext);
    const history = useHistory()
    const quantityCart = cart.cartObj.reduce((sum, next) => {
        return Number(sum) + Number(next.quantity);
    }, 0);

    const handleLogout = () => {
        userLogout(dispatch);
        history.push('/');
    }

    const handleLogin = () => {
        history.push('/login');
    }

    return (
        <div>
            <AppBar position="fixed" className={classes.headerBar}>
                <Toolbar className={classes.topHeaderBar}>
                    <div className={classes.headerWrapper}>
                        {user.isAuthenticated ?
                            (
                                <>
                                    <Typography color="primary" className={classes.typo}>{user.userDetails.fullName}</Typography>
                                    <Typography onClick={handleLogout} color="primary" className={classes.typo} className={classes.typo}>Đăng xuất</Typography>
                                    <Typography onClick={() => {history.push('/info')}} color="primary" className={classes.typo}>Thông tin</Typography>
                                    <Typography onClick={() => {history.push('/myorder')}} color="primary" className={classes.typo}>Đơn hàng</Typography>
                                </>
                            )
                            : (
                                <>
                                    <Typography onClick={handleLogin} className={classes.typo} color="primary">Đăng nhập</Typography>
                                    <Typography className={classes.typo} color="primary">Đăng ký</Typography>
                                </>
                            )
                        }
                    </div>
                </Toolbar>
                <header className={classes.menuBar}>
                    <div className={classes.logoWrapper}>
                        <img onClick={() => { history.push('/') }} className={classes.logo} src={logo} alt="" />
                    </div>
                    <DropdownMenu />
                    <RightHeaderBar quantityCart={!cart.loading ? quantityCart : 0} />
                </header>
            </AppBar>
        </div>
    );
};

export default Header;