import { Grid } from '@mui/material';
import { Skeleton } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductDetail, getProductRelate, removeProductDetail } from '../../../action/productAction';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import ProductDetailContent from '../../../component/ProductDetailContent';
import ProductImageSlider from '../../../component/ProductImageSlider';
import Section from '../../../component/Section';
import { ProductContext } from '../../../contextAPI/ProductContext';
import { ProductDetailContext } from '../../../contextAPI/ProductDetailContext';


const ProductDetail = () => {
    const { product, productDispatch } = useContext(ProductContext);
    const { productDetail, productDetailDispatch } = useContext(ProductDetailContext)
    const location = useLocation();
    const slug = location.pathname.slice(15);

    useEffect(() => {
        const fetchAPI = async () => {
            await getProductDetail(productDetailDispatch, { slug });
        }
        fetchAPI();
        return () => {
            removeProductDetail(productDetailDispatch)
        }
    }, [])

    useEffect(() => {
        if (productDetail.product != null) {
            const data = Object.assign({}, { slug: productDetail.product.category.slug }, { _id: productDetail.product._id })
            getProductRelate(productDispatch, { data })
        }
    }, [productDetail])

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/productdetail"} content={"Product Detail"} />
            <div style={{ padding: '0 48px' }}>
                <Grid container direction="column">
                    {productDetail.product !== null ? (
                        <Grid item container sm={12} spacing={6}>
                            <Grid item sm={6}>
                                <ProductImageSlider />
                            </Grid>
                            <Grid item sm={6}>
                                <ProductDetailContent />
                            </Grid>
                        </Grid>
                    ) :
                        (
                            <div style={{ display: 'flex' }}>
                                <Skeleton width="50%" style={{ marginRight: '20px' }} height="398.5px" variant="rectangular" />
                                <Skeleton width="50%" height="595px" variant="rectangular" />
                            </div>
                        )
                    }
                </Grid>
                <Section loading={product.loading} title="Sản phẩm liên quan" products={product.products} />
            </div>
        </Layout>
    );
}

export default ProductDetail;