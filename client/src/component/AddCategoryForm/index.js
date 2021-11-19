import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useState } from 'react';
import { addCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { SnackbarContext } from '../../contextAPI/SnackbarContext';
const useStyles = makeStyles(theme => ({
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

const AddCategoryForm = () => {
    const classes = useStyles();
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [categoryParent, setCategoryParent] = useState('');

    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("parentId", categoryParent);
        addCategory(categoryDispatch, formData, openSnackbarDispatch);
        handleClose();
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} color="primary" className={classes.button} variant="contained">Thêm </Button>
            <Dialog PaperProps={{ style: { minWidth: '500px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm nhóm hàng hóa</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.content}>
                        <FormControl margin="dense" fullWidth>
                            <TextField value={name} size="small" label="Tên" onChange={e => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <TextField
                                select
                                value={categoryParent}
                                onChange={(e) => setCategoryParent(e.target.value)}
                                label="Nhóm hàng hóa lớn"
                                size="small"
                            >
                                <MenuItem value="">
                                    <em>Không</em>
                                </MenuItem>
                                {createCategoryList(category.categories).map(
                                    (option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ),
                                )}
                            </TextField>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Hủy 
                    </Button>
                    <Button className={classes.addBtn} onClick={handleSubmit} color="secondary" autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddCategoryForm;