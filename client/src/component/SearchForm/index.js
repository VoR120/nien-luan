import { Menu, MenuItem, InputBase } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from '@mui/icons-material/Search';
import SearchFormContainer from '../SearchFormContainer';
import { searchProduct } from '../../action/productAction';

const useStyles = makeStyles((theme) => ({
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

const SearchForm = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const handleChangeValue = async (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const fetchAPI = async () => {
            let result = await searchProduct({ key: query });
            setResult(result)
        }
        if (query == "") {
            setOpen(false);
            setResult([]);
        } else {
            setOpen(true);
            fetchAPI();
        }
    }, [query])

    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon color="primary" />
                </div>
                <InputBase
                    placeholder="Search…"
                    onChange={handleChangeValue}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    color="primary"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <SearchFormContainer result={result} setResult={setResult} open={open} setOpen={setOpen} />
        </>
    );
};

export default SearchForm;