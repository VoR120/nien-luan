import { DialogTitle, Fab, Grid, TextField, Typography, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CartItem from '../CartItem'
import React, { useContext, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { ratingUser } from '../../action/userAction';
import { SnackbarContext } from '../../contextAPI/SnackbarContext';

const useStyles = makeStyles(theme => ({
    img: {
        width: '80%',
    },
    content: {
        // marginLeft: theme.spacing(1)
    },
    name: {
        fontWeight: '500',
        marginBottom: '20px'
    },
    price: {
        marginBottom: '20px'
    },
    quantitySpan: {
        display: 'flex',
        alignItem: 'center',
    },
    number: {
        width: theme.spacing(8),
        marginLeft: theme.spacing(2),
    },
    header: {
        marginBottom: '20px',
        textTransform: 'uppercase'
    },
    btn1: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        padding: '10px 25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    },
    btn2: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        padding: '10px 25px',
    },
    btns: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    xBtn: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: theme.palette.secondary.main,
        boxShadow: 'none'
    },
    addBtn: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
        alignItems: 'center',
        margin: '0 auto',
        '& .star-ratings': {
            width: '100%',
            textAlign: 'center'
        }
    },
    divider: {
        margin: '20px 0'
    }
}))

const RatingForm = (props) => {
    const { products } = props
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const [open, setOpen] = useState(false)

    const [rating, setRating] = useState([{ id: '', rating: 0 }]);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        ratingUser({ ratings: rating }, openSnackbarDispatch)
        setOpen(false)
    }

    const handleRatingClick = (index, r, name) => {
        const newRating = [...rating];
        newRating[index] = { id: name, rating: r }
        setRating(newRating)
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} style={{ margin: '2px 0px' }} variant="contained">Đánh giá</Button>
            <Dialog PaperProps={{ style: { maxWidth: '600px' } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    Đánh giá
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {products.length > 0 &&
                        products.map((product, index) =>
                            <>
                                <Grid container className={classes.container} alignItems="center">
                                    <Grid item xs={4}>
                                        <img className={classes.img} src={product.productId.productImages[0].url} alt="product" />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={classes.content}>
                                            <Typography className={classes.name}>{product.productId.name}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <StarRatings
                                    rating={rating[index] ? rating[index].rating : 0}
                                    starRatedColor="orange"
                                    changeRating={(rating, name) => handleRatingClick(index, rating, name)}
                                    numberOfStars={5}
                                    name={product.productId._id}
                                />
                                <Divider className={classes.divider} />
                            </>
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Hủy
                    </Button>
                    <Button className={classes.addBtn} onClick={handleSubmit} color="secondary" autoFocus>
                        Đánh giá
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RatingForm;