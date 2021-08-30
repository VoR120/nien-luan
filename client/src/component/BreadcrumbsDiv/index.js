import React from 'react';
import { Breadcrumbs, Grid, Link, makeStyles } from '@material-ui/core';

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
            <Link color="inherit" href="/" onClick={""}>
                Home
            </Link>
            <Link
                color="textPrimary"
                href={props.link}
                onClick={""}
                aria-current="page"
            >
                {props.content}
            </Link>
        </Breadcrumbs>
    );
};

export default BreadcrumbsDiv;