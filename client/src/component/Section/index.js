import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Skeleton } from '@mui/material';
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
    const { title, products, loading } = props;
    return (
        <div className={classes.section}>
            <Typography
                variant="h3"
                className={classes.header}
            >
                {title}
            </Typography>
            <div className={classes.separatorHolder} />
            {!loading ? (
                <ProductContent products={products} />
            ) :
                (
                    <Grid container spacing={2}>
                        <Grid item>
                            <Skeleton variant="rectangular" width="329px" height="284px"></Skeleton>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width="329px" height="284px"></Skeleton>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width="329px" height="284px"></Skeleton>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width="329px" height="284px"></Skeleton>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    );
}

export default Section;