import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import ProductImage from '../../public/img/GAN-11-M-Pro-Mini-3x3-Stickerless-Bright_1024x1024.jpg'

const ProductItem = () => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Sản phẩm"
                    image={ProductImage}
                    title="product"
                />
                <CardContent>
                    <Typography style={{ fontWeight: '500' }} color="textPrimary" gutterBottom variant="h5">
                        GAN 11 M Pro Mini 3x3
                    </Typography>
                    <Typography color="primary" variant="h5">
                        1.000.000đ
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductItem;