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
    const { name, _id } = props.form;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        deleteCategory(categoryDispatch, { _id })
        handleClose();
    }
    return (
        <>
            <DeleteIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    Do you want delete "{name}" category and all subcategory?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button className={classes.deleteBtn} color="secondary" onClick={handleSubmit}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteCategoryForm;