import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';

const ProductItem = (props) => {
    const { name, productImages, slug, price } = props.products;
    const history = useHistory();
    const handleRedirect = () => {
        history.push('/productdetail/' + slug);
    }

    return (
        <Card onClick={handleRedirect} >
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Sản phẩm"
                    image={productImages[0].url}
                    title="product"
                />
                <CardContent>
                    <Typography style={{ fontWeight: '500' }} color="textPrimary" gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <Typography color="primary" variant="h5">
                        <NumberFormat value={price} displayType="text" thousandSeparator={true} suffix="₫" />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductItem;