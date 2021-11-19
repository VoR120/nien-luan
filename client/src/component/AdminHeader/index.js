import { AppBar, FormControl, Input, Toolbar, Badge } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { adminLogout } from '../../action/authAction';
import { AuthContext } from '../../contextAPI/AuthContext';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { ProductContext } from '../../contextAPI/ProductContext';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.main,
        boxShadow: 'none'
    },
    title: {
        fontWeight: 500,
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    search: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuList: {
        color: theme.palette.primary.light,
    },
    icon: {
        color: theme.palette.primary.light,
        marginLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(1.2),
    }
}))

const useStyleBase = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        borderRadius: '0',
        marginLeft: '0'
    }
}), { name: 'MuiMenuItem' })

const AdminHeader = (props) => {
    const { aDispatch } = useContext(AuthContext);
    const { categoryDispatch } = useContext(CategoryContext);
    const { productDispatch } = useContext(ProductContext);
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    useStyleBase();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        setOpen(false);
        adminLogout(aDispatch, categoryDispatch, productDispatch);
        history.push('/admin/login');
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const classes = useStyles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar>
                <div className={classes.search}>
                    <SearchIcon className={classes.icon} fontSize="large" />
                    <FormControl size='small'>
                        <Input disableUnderline placeholder="Search..." />
                    </FormControl>
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    {/* <IconButton color="primary" size="large">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="primary" size="large">
                        <MailIcon />
                    </IconButton> */}
                    <IconButton
                        color="primary"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        size="large">
                        <AccountCircleIcon />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList className={classes.menuList} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
                                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;