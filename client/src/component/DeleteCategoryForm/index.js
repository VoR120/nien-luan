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


const DeleteCategoryForm = (props) => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const { name, _id } = props.form;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        deleteCategory(categoryDispatch, { _id }, openSnackbarDispatch)
        handleClose();
    }
    return (
        <>
            <DeleteIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Bạn có muốn xóa danh mục "{name}"?
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

export default DeleteCategoryForm;