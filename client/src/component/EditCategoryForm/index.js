import React, { useContext, useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles, Select, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addCategory, updateCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles(theme => ({
    dialogContent: {
        marginBottom: theme.spacing(2),
    },
    editBtn: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
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


const EditCategoryForm = (props) => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { name, parentId, _id } = props.form;
    const [nameUpdate, setNameUpdate] = useState(name);
    const [parentIdUpdate, setParentIdUpdate] = useState(parentId || '');
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", nameUpdate);
        formData.append("parentId", parentIdUpdate);
        formData.append("_id", _id);
        // formData.append("categoryImage", categoryImage);
        updateCategory(categoryDispatch, formData)
        handleClose();
    }
    return (
        <>
            <EditIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input value={nameUpdate} onChange={e => { setNameUpdate(e.target.value) }} />
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Category Parent</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // defaultChecked={_id}
                            value={parentIdUpdate}
                            onChange={(e) => setParentIdUpdate(e.target.value)}
                            label="Category Parent"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {createCategoryList(category.categories).map(
                                (option, index) => {
                                    {/* console.log(option.name ," : ",option.name === parent) */ }
                                    return (
                                        <MenuItem key={index} value={option.value} selected={option.value === parentIdUpdate}>
                                            {option.name}
                                        </MenuItem>
                                    )
                                },
                            )}
                        </Select>
                    </FormControl>
                    {/* <FormControl margin="dense" fullWidth>
                        <InputLabel htmlFor="my-input">Image</InputLabel>
                        <Input type="file" onChange={e => setCategoryImage(e.target.files[0])} />
                    </FormControl> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button className={classes.editBtn} onClick={handleSubmit} color="secondary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditCategoryForm;