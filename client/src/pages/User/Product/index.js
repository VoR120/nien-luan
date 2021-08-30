import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../../../component/Layout';
import ProductDetailContent from '../../../component/ProductDetailContent';
import Section from '../../../component/Section';
import ProductImageSlider from '../../../component/ProductImageSlider';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';

const ProductDetail = () => {
    return (
        <Layout headfoot>
        <BreadcrumbsDiv link={"/productdetail"} content={"Product Detail"} />
            <div style={{ padding: '0 48px' }}>
                <Grid container direction="column">
                    <Grid item container sm={12} spacing={6}>
                        <Grid item sm={6}>
                            <ProductImageSlider />
                        </Grid>
                        <Grid item sm={6}>
                            <ProductDetailContent />
                        </Grid>
                    </Grid>
                </Grid>
                <Section title="Sản phẩm liên quan" />
            </div>
        </Layout>
    )
}

export default ProductDetail;