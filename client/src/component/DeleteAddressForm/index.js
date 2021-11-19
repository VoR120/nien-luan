import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from 'react';
import { deleteCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { SnackbarContext } from '../../contextAPI/SnackbarContext';
import { Typography } from '@mui/material';
import { AddressContext } from '../../contextAPI/AddressContext'
import { removeAddress } from '../../action/addressAction';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    deleteBtn: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    },
    deleteline: {
        textDecoration: 'underline',
        color: theme.palette.error.main,
        cursor: 'pointer'
    }
}))


const DeleteAddressForm = (props) => {
    const { id } = props
    const classes = useStyles();
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { address, addressDispatch } = useContext(AddressContext)
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        removeAddress(addressDispatch, id);
        handleClose();
    }
    return (
        <>
            <Typography onClick={() => setOpen(true)} className={classes.deleteline}>Xóa</Typography>
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa danh mục địa chỉ này?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Hủy
                    </Button>
                    <Button className={classes.deleteBtn} color="secondary" onClick={handleSubmit}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteAddressForm;