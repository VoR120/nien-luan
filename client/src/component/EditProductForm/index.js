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
import EditIcon from '@mui/icons-material/Edit';
import React, { useContext, useState } from 'react';
import { updateProduct } from '../../action/productAction';
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

const EditProductForm = (props) => {
    const classes = useStyles();
    const { product, productDispatch } = useContext(ProductContext);
    const { category, categoryDispatch } = useContext(CategoryContext);
    const { categoryId, name, _id, image, price, size, quantity, brand, description, weight, magnet } = props.form;
    const [open, setOpen] = useState(false);
    const [nameUpdate, setNameUpdate] = useState(name);
    const [categoryUpdate, setCategoryUpdate] = useState(categoryId || '');

    const [priceUpdate, setPriceUpdate] = useState(price);
    const [quantityUpdate, setQuantityUpdate] = useState(quantity);
    const [brandUpdate, setBrandUpdate] = useState(brand);
    const [desUpdate, setDesUpdate] = useState(description);
    const [sizeUpdate, setSizeUpdate] = useState(size);
    const [weightUpdate, setWeightUpdate] = useState(weight);
    const [magnetUpdate, setMagnetUpdate] = useState(magnet);

    const [imageUpload, setImageUpload] = useState(() => {
        const imageArray = [];
        if (image.length > 0) {
            image.map(img => imageArray.push(img))
        }
        return imageArray;
    });

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
        formData.append("name", nameUpdate);
        formData.append("category", categoryUpdate);
        formData.append("_id", _id);
        formData.append("price", priceUpdate);
        formData.append("quantity", quantityUpdate);
        formData.append("brand", brandUpdate);
        formData.append("size", sizeUpdate);
        formData.append("weight", weightUpdate);
        formData.append("magnet", magnetUpdate);
        formData.append("description", desUpdate);
        formData.append("productImages", JSON.stringify(imageUpload));
        updateProduct(productDispatch, formData);
        handleClose();
    }
    return (
        <>
            <EditIcon onClick={() => setOpen(true)} className={classes.icon} />
            <Dialog PaperProps={{ style: { minWidth: '900px' } }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sửa sản phẩm</DialogTitle>
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
                            {/*<Input value={name} onChange={e => { setName(e.target.value) }} /> */}
                            <TextField label="Tên" variant="outlined" size="small" value={nameUpdate} onChange={e => { setNameUpdate(e.target.value) }} />
                        </FormControl>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <TextField
                                label="Nhóm hàng hóa"
                                select
                                size="small"
                                value={categoryUpdate}
                                onChange={(e) => setCategoryUpdate(e.target.value)}
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
                            </TextField>
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField type="number" label="Giá" variant="outlined" size="small" value={priceUpdate} onChange={e => { setPriceUpdate(e.target.value) }} />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField type="number" label="Số lượng" variant="outlined" size="small" value={quantityUpdate} onChange={e => { setQuantityUpdate(e.target.value) }} />
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField label="Thương hiệu" variant="outlined" size="small" value={brandUpdate} onChange={e => { setBrandUpdate(e.target.value) }} />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl margin="dense" fullWidth>
                                    <TextField label="Kích thước" variant="outlined" size="small" value={sizeUpdate} onChange={e => { setSizeUpdate(e.target.value) }} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl margin="dense" fullWidth>
                                    <TextField label="Khối lượng" variant="outlined" size="small" value={weightUpdate} onChange={e => { setWeightUpdate(e.target.value) }} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl margin="dense" component="fieldset">
                            <FormLabel component="legend">Nam châm</FormLabel>
                            <RadioGroup style={{ display: 'inline' }} aria-label="magnet" name="magnet" value={magnetUpdate} onChange={e => { setMagnetUpdate(e.target.value) }}>
                                <FormControlLabel value="true" control={<Radio color="primary" />} label="Có" />
                                <FormControlLabel value="false" control={<Radio color="primary" />} label="Không" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <TextField label="Mô tả" variant="outlined" size="small" multiline minRows={3} inputComponent="textarea" value={desUpdate} onChange={e => { setDesUpdate(e.target.value) }} />
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

export default EditProductForm;