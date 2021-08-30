import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ProductContent from '../ProductContent';

const useStyles = makeStyles({
    section: {
        marginTop: '80px',
        marginBottom: '80px',
        margin: '0 auto',
    },
    header: {
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        letterSpacing: '3px'
    },
    separatorHolder: {
        width: '140px',
        margin: '0 auto',
        borderBottom: '2px solid black',
        marginBottom: '40px',
    },
})

const Section = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.section}>
            <Typography
                variant="h3"
                className={classes.header}
            >
                {props.title}
            </Typography>
            <div className={classes.separatorHolder} />
            <ProductContent />
        </div>
    )
}

export default Section;