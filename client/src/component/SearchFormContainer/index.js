import { Paper, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    paper: (props) => ({
        display: props.open ? 'block' : 'none',
        position: 'absolute',
        width: '400px',
        height: '361px',
        top: '100%',
        right: '0',
        padding: theme.spacing(1, 2, 1),
        overflow: 'hidden',
        overflowY: 'scroll',
        zIndex: 2,
    }),
    item: {
        height: '90px',
        display: 'flex',
        marginBottom: theme.spacing(1)
    },
    image: {
        height: '100%',
        marginRight: theme.spacing(1)
    },
    imageWrapper: {
        height: '100%'
    },
    header: {
        margin: theme.spacing(0, 0, 1)
    },
    modal: (props) => ({
        display: props.open ? 'block' : 'none',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%', 
        height: '100%', 
        overflow: 'auto', 
    })
}))

const SearchFormContainer = (props) => {
    const classes = useStyles(props);
    console.log(props);

    return (
        <>
            <div onClick={() => props.setOpen(false)} className={classes.modal}>
            </div>
            <Paper variant="outlined" square className={classes.paper}>
                <Typography className={classes.header}>SẢN PHẨM</Typography>
                <Grid container>
                    {props.result.length > 0 ? props.result.map(item => {
                        return (
                            <Grid className={classes.item} item>
                                <img className={classes.image} src={item.productImages[0].url} />
                                <div>
                                    {item.name}
                                    {item.category.name}
                                </div>
                            </Grid>
                        )
                    }) : (<>Không có sản phẩm</>)
                    }
                </Grid>
            </Paper>
        </>
    );
};

export default SearchFormContainer;