import { Button, Divider, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Rating } from '@mui/material';
import React, { useContext, useState } from 'react';
import NumberFormat from 'react-number-format';
import { addToCart } from '../../action/cartAction';
import { CartContext } from '../../contextAPI/CartContext';
import { ProductDetailContext } from '../../contextAPI/ProductDetailContext';
import AddToCartDialog from '../AddToCartDialog';
import ProductMeta from '../ProductMeta';

const useStyle = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    starrating: {
        display: 'flex',
        alignItems: 'center',
    },
    mountRating: {
        marginLeft: '8px',
    },
    quantity: {
        marginTop: "50px",
        marginBottom: "50px",
    },
    price: {
        margin: '20px 0px'
    },
    number: {
        width: theme.spacing(8),
        marginRight: theme.spacing(2),
    },
    headerInfo: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: '12px 0',
    },
    description: {
        lineHeight: '1.8rem',
    }
}))

const ProductDetailContent = () => {
    const { productDetail } = useContext(ProductDetailContext);
    const [open, setOpen] = useState(false);
    const { _id, slug, name, category, price, quantity, description, size, weight, brand, magnet, productImages } = productDetail.product
    const classes = useStyle();
    const [value, setValue] = useState(3);
    const [quantityOrder, setQuantityOrder] = useState(1);
    const { cart, cartDispatch } = useContext(CartContext);
    const cartItem = { product: { _id, slug, name, price, productImages }, price: price * quantityOrder, quantity: quantityOrder }
    
    const handleAddToCart = () => {
        addToCart(cartDispatch, { cartItem: cartItem });
        setOpen(true)
    }

    const getM = (magnet) => {
        let M;
        if (magnet == "undefined") M = "";
        if (magnet == true) M = "Có";
        if (magnet == false) M = "Không";
        return M;
    }

    return (
        <div>
            <Typography className={classes.header} gutterBottom variant="h4" component="h2">
                {name}
            </Typography>
            <div className={classes.starrating}>
                <Rating size="small" name="read-only" value={value} readOnly />
                <Typography className={classes.mountRating} variant="h6" color="textSecondary" component="h2">
                    (2 đánh giá)
                </Typography>
            </div>
            <Typography className={classes.price} variant="h3" component="h2" color="primary">
                <NumberFormat value={price} displayType="text" thousandSeparator={true} suffix="₫" />
            </Typography>
            {quantity > 0 ? (
                <div className={classes.quantity}>
                    <TextField value={quantityOrder} onChange={(e) => setQuantityOrder(e.target.value)} size="small" type="number" className={classes.number} />
                    <Button
                        onClick={handleAddToCart}
                        variant="outlined"
                        color="primary"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            ) : (
                <Button
                    disabled
                    variant="outlined"
                    color="primary"
                >
                    Hết hàng
                </Button>
            )}
            <div>
                <Divider className={classes.divider} />
                <Typography className={classes.headerInfo} variant="h5">
                    Thông tin
                </Typography>
                <ProductMeta label={"Thương hiệu"} value={brand} />
                <ProductMeta label={"Loại"} value={category.name} />
                <ProductMeta label={"Nam châm"} value={getM(magnet)} />
                <ProductMeta label={"Kích cỡ"} value={size} />
                <ProductMeta label={"Cân nặng"} value={weight} />
            </div>
            <div>
                <Divider className={classes.divider} />
                <Typography className={classes.headerInfo} variant="h5">
                    Mô tả
                </Typography>
                <Typography className={classes.description} variant="h5" color="textPrimary">
                    {description}
                </Typography>
            </div>
            <AddToCartDialog cartItem={cartItem} open={open} setOpen={setOpen} />
        </div>
    )
}

export default ProductDetailContent;