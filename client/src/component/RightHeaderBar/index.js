import { alpha, IconButton, InputBase, makeStyles, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';

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
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

const RightHeaderBar = () => {
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
            <IconButton>
                <ShoppingCartIcon />
            </IconButton>
        </div>
    );
};

export default RightHeaderBar;