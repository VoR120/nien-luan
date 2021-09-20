import React, { useContext, useEffect } from 'react';
import { getAllProduct } from '../../action/productAction';
import CarouselSlider from '../../component/Carousel';
import Section from '../../component/Section';
import SectionCategory from '../../component/SectionCategory';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { ProductContext } from '../../contextAPI/ProductContext';
import lubeImage from '../../public/img/cosmic-lubes-1_1024x.jpg';
import stickerImage from '../../public/img/stickers-2_1024x.jpg';

const Main = () => {
    const { product, productDispatch } = useContext(ProductContext);

    useEffect(() => {
        getAllProduct(productDispatch);
    }, [])

    return (
        <>
            <CarouselSlider />
            <div style={{ padding: '0 48px' }}>
                <Section loading={product.loading} title={"Sản phẩm mới"} products={product.products} />
                <Section loading={product.loading} title={"Sản phẩm phổ biến"} products={product.products} />
                <SectionCategory
                    link={"/collection/Cosmic-Lube"}
                    image={lubeImage}
                    imageLeft
                    title={"Bạn muốn khối rubik của bạn mượt hơn?"}
                    content={`Dầu bôi trơn sẽ giúp kéo dài tuổi thọ khối rubik của bạn và tằng độ mượt.
                    Dễ sử dụng, thời gian duy trì lâu.`}
                />
                <SectionCategory
                    link={"/collection/3x3"}
                    image={stickerImage}
                    title={"Bạn muốn trang trí khối rubik của bạn?"}
                    content={`Hãy mua sticker về và trang trí cho rubik bạn 
                    ngay tại nhà với đa dạng mẫu mã và màu sắc`}
                />
            </div>
        </>
    );
};

export default Main;