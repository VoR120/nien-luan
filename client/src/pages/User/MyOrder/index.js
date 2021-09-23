import React from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import Layout from '../../../component/Layout';

const MyOrder = () => {
    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/myorder"} content={"Đơn hàng"} />
            My Order Page
        </Layout>
    );
};

export default MyOrder;