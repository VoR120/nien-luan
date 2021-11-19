import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Rating } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    mountRating: {
        marginLeft: '8px',
    },
}))

const ProductItem = (props) => {
    const classes = useStyles()
    const { name, productImages, slug, price, offer, quantity, ratingView } = props.products;
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
                    <Typography color={quantity > 0 ? "primary" : "error"} variant="h5">
                        {quantity > 0 ?
                            <NumberFormat value={price} displayType="text" thousandSeparator={true} suffix="₫" />
                            : "Hết hàng"
                        }
                    </Typography>
                    <Grid container style={{ marginTop: 8 }}>
                        <Grid item xs={6}>Đã bán {offer || 0}</Grid>
                        <Grid item xs={6} flex="1" container>
                            <Rating size="small" name="read-only" value={ratingView.rate} readOnly />
                            <Typography className={classes.mountRating} variant="h6" color="textSecondary" component="h2">
                                ({ratingView.quantity})
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductItem;