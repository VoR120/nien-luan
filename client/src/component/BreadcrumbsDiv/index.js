import React from 'react';
import { Breadcrumbs, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    breadcrumbs: {
        margin: '138px 0 30px',
        backgroundColor: '#eee',
        padding: '8px 48px'
    }
}))

const BreadcrumbsDiv = (props) => {
    const classes = useStyles();
    return (
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
            <Link color="inherit" to="/" onClick={""}>
                Home
            </Link>
            <Link
                color="textPrimary"
                to={props.link}
                aria-current="page"
            >
                {props.content}
            </Link>
        </Breadcrumbs>
    );
};

export default BreadcrumbsDiv;