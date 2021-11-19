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
import { Link, NavLink, useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        textAlign: 'center',
        margin: '18px 0 22px'
    },
    xBtn: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: theme.palette.secondary.main,
        boxShadow: 'none'
    }
}))

const ContentDialog = (props) => {
    const classes = useStyles();
    const { open, setOpen, cartItem } = props;
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
                    <Typography>Bạn chưa đăng nhập! <NavLink to="/login">Đăng nhập</NavLink></Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ContentDialog;