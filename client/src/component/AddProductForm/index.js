import React, { useContext, useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles, Select, MenuItem, IconButton, CircularProgress, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addProduct } from '../../action/productAction';
import { ProductContext } from '../../contextAPI/ProductContext';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../../helper/axios';
import { CategoryContext } from '../../contextAPI/CategoryContext';
const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: theme.spacing(2),
    },
    dialogContent: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around',
        // alignItems: 'center',
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
    imageWrapper: {
        position: 'relative',
        minWidth: '450px',   
        height: '280px',
        background: 'white',

        margin: '0 30px',
        marginTop: theme.spacing(1),
    },
    fileUpload: {
        position: 'relative',
        width: '100%',
        height: '100%',
        outline: '1px solid #ddd',
        '&::before': {
            content: '"+"',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            fontSize: '17rem',
            margin: 'auto',
            textAlign: 'center',
            backgroundColor: theme.palette.secondary.main
        },
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
    const { product, productDispatch } = useContext(ProductContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageUpload, setImageUpload] = useState([]);
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const file = [...e.target.files];
            if (file.length == 0) alert('File not exist');
            const formData = new FormData();
            file.forEach(f => formData.append('file', f))
            setLoading(true);
            const res = await axios.post('/api/upload', formData);
            setLoading(false)
            const imageArr = [];
            res.data.file.map((file) => {
                imageArr.push(file)
            })
            // imageArr.push(res.data.file[0]);
            setImageUpload(imageArr);
        } catch (error) {
            console.log(error);
        }
    }
    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            const removeImage = [];
            imageUpload.map(image => removeImage.push(image.public_id))
            setLoading(true);
            const res = await axios.post('/api/delete', { public_id: removeImage });
            setLoading(false);
            if (res.status === 200)
                setImageUpload([]);
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("category", categoryId);
        formData.append("productImages", JSON.stringify(imageUpload));
        addProduct(productDispatch, formData);
        handleClose();
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} color="primary" className={classes.button} variant="contained">Thêm </Button>
            <Dialog PaperProps={{ style: { minWidth: '900px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.imageWrapper} >
                        {imageUpload.length > 0 ?
                            imageUpload.map((img) => {
                                return (
                                    <>
                                        <img className={classes.fileUpload} style={{ height: '100%' }}
                                            src={img.url}
                                            alt=""
                                        />
                                        <IconButton className={classes.closeBtn} size="small" onClick={handleRemove}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>)
                            })
                            :
                            <>
                                {loading ?
                                    <div className={classes.loadingWrapper}>
                                        <CircularProgress className={classes.loading} />
                                    </div>
                                    :
                                    <input type="file" multiple className={classes.fileUpload} onChange={handleUpload} />
                                }
                            </>
                        }
                    </div>
                    <div className={classes.content}>
                        <FormControl  margin="dense" fullWidth>
                            {/* <InputLabel htmlFor="my-input">Tên</InputLabel>
                            <Input value={name} onChange={e => { setName(e.target.value) }} /> */}
                            <TextField label="Tên" variant="outlined" size="small" value={name} onChange={e => { setName(e.target.value) }}/>
                        </FormControl>
                        <FormControl variant="outlined"  fullWidth margin="dense">
                            <InputLabel>Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
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
                        <FormControl  margin="dense" fullWidth>
                            {/* <InputLabel htmlFor="my-input">Giá</InputLabel> */}
                            <TextField label="Giá" variant="outlined" size="small" value={name} onChange={e => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl  margin="dense" fullWidth>
                            {/* <InputLabel htmlFor="my-input">Số lượng</InputLabel> */}
                            <TextField label="Số lượng" variant="outlined" size="small" value={name} onChange={e => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl  margin="dense" fullWidth>
                            {/* <InputLabel htmlFor="my-input">Thương hiệu</InputLabel> */}
                            <TextField label="Thương hiệu" variant="outlined" size="small" value={name} onChange={e => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl  margin="dense" fullWidth>
                            {/* <InputLabel htmlFor="my-input">Mô tả</InputLabel> */}
                            <TextField label="Mô tả" variant="outlined" size="small" multiline minRows={3} inputComponent="textarea" value={name} onChange={e => { setName(e.target.value) }} />
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

export default AddCategoryForm;