import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    imageWrapper: props => ({
        padding: props.imageLeft ? '60px 0 60px 60px' : '60px 60px 60px 0'
    }),
    image: {
        width: '100%'
    },
    contentWrapper: {
        height: '100%',
        verticalAlign: 'middle',
        alignSelf: 'center',
        textAlign: 'center',
        padding: '0 50px'
    },
    headerContent: {
        fontSize: '1.2rem',
        display: 'block',
        marginBottom: '5px'
    },
    button: {
        marginTop: '10px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    }
}))

const SectionCategory = (props) => {
    const classes = useStyles(props);
    return (
        <Grid container>
            {props.imageLeft ?
                <>
                    <Grid item xs={12} lg={6} md={6} justifyContent="center">
                        <div className={classes.imageWrapper}>
                            <img className={classes.image} src={props.image} />
                        </div>
                    </Grid>
                    <Grid className={classes.contentWrapper} item xs={12} lg={6} md={6}>
                        <Typography
                            variant="button"
                            className={classes.headerContent}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant="h5"
                        >
                            {props.content}
                        </Typography>
                        <Button className={classes.button}>
                            Mua ngay
                        </Button>
                    </Grid>
                </>
                :
                <>
                    <Grid className={classes.contentWrapper} item xs={12} lg={6} md={6}>
                        <Typography
                            variant="button"
                            className={classes.headerContent}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant="h5"
                        >
                            {props.content}
                        </Typography>
                        <Button className={classes.button}>
                            Mua ngay
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={6} md={6} justifyContent="center">
                        <div className={classes.imageWrapper}>
                            <img className={classes.image} src={props.image} />
                        </div>
                    </Grid>
                </>
            }
        </Grid>
    );
};

export default SectionCategory;