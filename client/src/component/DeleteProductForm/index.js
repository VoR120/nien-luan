import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from 'react';
import { deleteProduct } from '../../action/productAction';
import { ProductContext } from '../../contextAPI/ProductContext';
import { SnackbarContext } from '../../contextAPI/SnackbarContext';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    deleteBtn: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        }
    }
}))


const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category.children.length > 0) {
            createCategoryList(category.children, options);
        }
    }
    return options;
};


const DeleteProductForm = (props) => {
    const classes = useStyles();
    const { product, productDispatch } = useContext(ProductContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { name, _id, image } = props.form;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        deleteProduct(productDispatch, { _id, image }, openSnackbarDispatch)
        handleClose();
    }
    return (
        <>
            <DeleteIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn muốn xóa sản phẩm "{name}"?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Hủy
                    </Button>
                    <Button className={classes.deleteBtn} color="secondary" onClick={handleSubmit}>
                        xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteProductForm;