import React, { useContext, useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles, Select, MenuItem } from '@material-ui/core';
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
    },
    addBtn: {
        backgroundColor: theme.palette.success.main,
        '&:hover' : {
            backgroundColor: theme.palette.success.dark,
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

const AddCategoryForm = () => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [categoryParent, setCategoryParent] = useState('');
    const [categoryImage, setCategoryImage] = useState(null)
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("parentId", categoryParent);
        formData.append("categoryImage", categoryImage);
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category Parent</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={categoryParent}
                            onChange={(e) => setCategoryParent(e.target.value)}
                            label="Category Parent"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {createCategoryList(category.categories).map(
                                (option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ),
                            )}
                        </Select>
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
                    <Button className={classes.addBtn} onClick={handleSubmit} color="secondary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddCategoryForm;