import {
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from 'react';
import { addProduct } from '../../action/productAction';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { ProductContext } from '../../contextAPI/ProductContext';
import axios from '../../helper/axios';
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
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [brand, setBrand] = useState('');
    const [des, setDes] = useState('');
    const [size, setSize] = useState(56);
    const [weight, setWeight] = useState(63);
    const [magnet, setMagnet] = useState(0);
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
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("weight", weight);
        formData.append("magnet", magnet);
        formData.append("description", des);
        formData.append("productImages", JSON.stringify(imageUpload));
        addProduct(productDispatch, formData);
        handleClose();
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} color="primary" className={classes.button} variant="contained">Thêm </Button>
            <Dialog PaperProps={{ style: { minWidth: '900px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Thêm sản phẩm</DialogTitle>
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
                        <FormControl margin="dense" fullWidth>
                            <TextField label="Tên" variant="outlined" size="small" value={name} onChange={e => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <TextField
                                select
                                id="demo-simple-select-outlined"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                label="Category Parent"
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
                        <FormControl margin="dense" fullWidth>
                            <TextField type="number" label="Giá" variant="outlined" size="small" value={price} onChange={e => { setPrice(e.target.value) }} />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField type="number" label="Số lượng" variant="outlined" size="small" value={quantity} onChange={e => { setQuantity(e.target.value) }} />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField label="Thương hiệu" variant="outlined" size="small" value={brand} onChange={e => { setBrand(e.target.value) }} />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl margin="dense" fullWidth>
                                    <TextField label="Kích thước" variant="outlined" size="small" value={size} onChange={e => { setSize(e.target.value) }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense" fullWidth>
                                    <TextField label="Khối lượng" variant="outlined" size="small" value={weight} onChange={e => { setWeight(e.target.value) }} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl margin="dense" component="fieldset">
                            <FormLabel component="legend">Nam châm</FormLabel>
                            <RadioGroup style={{ display: 'inline' }} aria-label="magnet" name="magnet" value={magnet} onChange={e => { setMagnet(e.target.value) }}>
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Có" />
                                <FormControlLabel value="0" control={<Radio color="primary" />} label="Không" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField label="Mô tả" variant="outlined" size="small" multiline minRows={3} inputComponent="textarea" value={des} onChange={e => { setDes(e.target.value) }} />
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