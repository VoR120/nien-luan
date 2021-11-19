import { FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import React, { useContext, useState } from 'react';
import { updateCategory } from '../../action/categoryAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { SnackbarContext } from '../../contextAPI/SnackbarContext';
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
    const { openSnackbarDispatch } = useContext(SnackbarContext);
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
        updateCategory(categoryDispatch, formData, openSnackbarDispatch)
        handleClose();
    }
    return (
        <>
            <EditIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog PaperProps={{ style: { minWidth: '500px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sửa nhóm hàng hóa</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.content}>
                        <FormControl margin="dense" fullWidth>
                            <TextField size="small" label="Tên" value={nameUpdate} onChange={e => { setNameUpdate(e.target.value) }} />
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <TextField
                                select
                                size="small"
                                value={categoryParent}
                                onChange={(e) => setCategoryParent(e.target.value)}
                                label="Nhóm hàng hóa lớn"
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
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default EditCategoryForm;