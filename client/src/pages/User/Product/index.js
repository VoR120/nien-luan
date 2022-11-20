import { Grid } from '@mui/material';
import { Skeleton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductDetail, getProductRelate, getRelateProduct, removeProductDetail } from '../../../action/productAction';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';
import ProductDetailContent from '../../../component/ProductDetailContent';
import ProductImageSlider from '../../../component/ProductImageSlider';
import Section from '../../../component/Section';
import { ProductContext } from '../../../contextAPI/ProductContext';
import { ProductDetailContext } from '../../../contextAPI/ProductDetailContext';
import ProductSkeleton from './ProductSkeleton';


const ProductDetail = () => {
    const [productDetail, setProductDetail] = useState(null);
    const [productRelate, setProductRelate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(true);
    const location = useLocation();
    const slug = location.pathname.slice(15);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getProductDetail(slug);
            setProductDetail(res)
            setLoading(false)
        }
        setLoading(true);
        fetchAPI();
    }, [])

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getRelateProduct({ slug: productDetail.category.name, id: productDetail._id })
            setProductRelate(res)
            setLoading2(false)
        }
        if (productDetail)
            fetchAPI();
    }, [productDetail])

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getProductDetail(slug);
            setProductDetail(res)
            setLoading(false)
        }
        setLoading(true)
        setProductRelate([])
        fetchAPI();
    }, [slug])

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/productdetail"} content={"Product Detail"} />
            <div style={{ padding: '0 48px' }}>
                <Grid container direction="column">
                    {(productDetail && !loading) ?
                        <Grid item container sm={12} spacing={6}>
                            <Grid item sm={6}>
                                <ProductImageSlider productDetail={productDetail} />
                            </Grid>
                            <Grid item sm={6}>
                                <ProductDetailContent productDetail={productDetail} />
                            </Grid>
                        </Grid>
                        :
                        <ProductSkeleton />
                    }
                </Grid>
                {
                    productRelate.length > 0 &&
                    <Section loading={loading2} title="Sản phẩm liên quan" products={productRelate} />
                }
            </div>
        </Layout>
    );
}

export default ProductDetail;