import { Badge, IconButton, InputBase } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    rightBarWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        marginLeft: 0,
        marginRight: theme.spacing(1),
        width: '100%',
        color: theme.palette.primary.main,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const getCartBadge = () => {

}

const RightHeaderBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.rightBarWrapper}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon color="primary" />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    color="primary"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <NavLink to="/cart">
                <IconButton size="large">
                    <Badge badgeContent={props.quantityCart} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </NavLink>
        </div>
    );
};

export default RightHeaderBar;