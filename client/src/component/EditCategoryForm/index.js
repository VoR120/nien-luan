import React, { useContext, useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles, Select, MenuItem, IconButton, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addCategory, updateCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../helper/axios';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles(theme => ({
    editBtn: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    button: {
        marginBottom: theme.spacing(2),
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around',
    },
    content: {
        flexGrow: 1
    },
    addBtn: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main
        }
    },
    loadingWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    loading: {
        position: 'absolute',
        left: 'calc( 50% - 20px )',
        top: 'calc( 50% - 20px )'
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
    const [categoryParent, setCategoryParent] = useState(parentId || '');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", nameUpdate);
        formData.append("parentId", categoryParent);
        formData.append("_id", _id);
        updateCategory(categoryDispatch, formData)
        handleClose();
    }
    return (
        <>
            <EditIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog PaperProps={{ style: { minWidth: '500px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.content}>
                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor="my-input">Name</InputLabel>
                            <Input value={nameUpdate} onChange={e => { setNameUpdate(e.target.value) }} />
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
                    </div>
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

export default EditCategoryForm;