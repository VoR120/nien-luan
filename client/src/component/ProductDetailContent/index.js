import { Box, Button, Divider, FormControl, Grid, Input, makeStyles, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
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

    const classes = useStyle();
    const [value, setValue] = useState(3);

    return (
        <div>
            <Typography className={classes.header} gutterBottom variant="h4" component="h2">
                GAN 11 M Pro 3x3 Mini
            </Typography>
            <div className={classes.starrating}>
                <Rating size="small" name="read-only" value={value} readOnly />
                <Typography className={classes.mountRating} variant="h6" color="textSecondary" component="h2">
                    (2 đánh giá)
                </Typography>
            </div>
            <Typography className={classes.price} variant="h3" component="h2" color="primary">
                50.000đ
            </Typography>
            <div className={classes.quantity}>
                <TextField defaultValue={1} size="small" type="number" className={classes.number} />
                <Button
                    variant="outlined"
                    color="primary"
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
            <div>
                <Divider className={classes.divider} />
                <Typography className={classes.headerInfo} variant="h5">
                    Thông tin
                </Typography>
                <ProductMeta label={"Thương hiệu"} value={"GAN"} />
                <ProductMeta label={"Loại"} value={"3x3"} />
                <ProductMeta label={"Nam châm"} value={"Có"} />
                <ProductMeta label={"Kích cỡ"} value={"55mm"} />
                <ProductMeta label={"Cân nặng"} value={"63g"} />
            </div>
            <div>
                <Divider className={classes.divider} />
                <Typography className={classes.headerInfo} variant="h5">
                    Mô tả
                </Typography>
                <Typography className={classes.description} variant="h5" color="textPrimary">
                    GAN 11 M Pro 3x3 is GAN cube's 2020 flagship model and has continued to be the choice of many speedcubers since its release.
                    The great thing about the GAN 11 M Pro is that it is great for any cuber, beginner or advanced since the overall feel can be adjusted to your exact preferences as your times continue to decrease rather than purchasing new speedcubes.
                </Typography>
            </div>
        </div>
    )
}

export default ProductDetailContent;