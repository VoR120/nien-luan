import { DialogTitle, Fab, Grid, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CartItem from '../CartItem'
import React from 'react';
import NumberFormat from 'react-number-format';
import ClearIcon from '@mui/icons-material/Clear';
import { Link, useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    img: {
        width: '100%',
    },
    content: {
        marginLeft: theme.spacing(4)
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
    }
}))

const AddToCartDialog = (props) => {
    const classes = useStyles();
    const { open, setOpen, cartItem } = props;
    const history = useHistory()
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        handleClose();
    }

    return (
        <>
            <Dialog PaperProps={{ style: { maxWidth: '360px' } }} fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    <Fab onClick={handleClose} size="small" className={classes.xBtn}>
                        <ClearIcon />
                    </Fab>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography className={classes.header} variant="h3">Đã thêm vào giỏ hàng !</Typography>
                    <Grid container className={classes.container}>
                        <Grid item xs={4}>
                            <img className={classes.img} src={cartItem.product.productImages[0].url} alt="product" />
                        </Grid>
                        <Grid item xs={8}>
                            <div className={classes.content}>
                                <Typography className={classes.name}>{cartItem.product.name}</Typography>
                                <Typography className={classes.price}>
                                    <NumberFormat value={cartItem.price} displayType="text" thousandSeparator={true} suffix="₫" />
                                </Typography>
                                <div className={classes.quantitySpan}>
                                    <Typography className={classes.price}>Số lượng: {cartItem.quantity}</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.btns}>
                    <Link to="/cart">
                        <Button className={classes.btn1} onClick={handleClose} >
                            Xem giỏ hàng
                        </Button>
                    </Link>
                    <Button className={classes.btn2} variant="outlined" onClick={handleSubmit}>
                        Thanh toán
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddToCartDialog;