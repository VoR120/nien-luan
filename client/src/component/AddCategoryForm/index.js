import React, { useContext, useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: theme.spacing(2),
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
    }
}))

const AddCategoryForm = () => {
    const classes = useStyles();
    const { categoryDispatch } = useContext(CategoryContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null)
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("categoryImage", categoryImage);
        console.log(formData.getAll("categoryImage"));
        addCategory(categoryDispatch, formData);
        handleClose();
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} color="primary" className={classes.button} variant="contained">Thêm </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input value={name} onChange={e => { setName(e.target.value) }} />
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel htmlFor="my-input">Image</InputLabel>
                        <Input type="file" onChange={e => setCategoryImage(e.target.files[0])} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddCategoryForm;