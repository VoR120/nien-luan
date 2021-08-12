import { AppBar, FormControl, Input, makeStyles, Toolbar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
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
    const { dispatch } = useContext(AuthContext);
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
        adminLogout(dispatch, categoryDispatch, productDispatch);
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
                    <IconButton color="primary">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="primary">
                        <MailIcon />
                    </IconButton>
                    <IconButton color="primary"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
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
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
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