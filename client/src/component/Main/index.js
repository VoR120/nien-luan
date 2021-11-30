import React, { useContext, useEffect, useState } from 'react';
import { getAllProduct, getNewestProduct, getPopulateProduct } from '../../action/productAction';
import CarouselSlider from '../../component/Carousel';
import Section from '../../component/Section';
import SectionCategory from '../../component/SectionCategory';
import { CategoryContext } from '../../contextAPI/CategoryContext';
import { ProductContext } from '../../contextAPI/ProductContext';
import lubeImage from '../../public/img/cosmic-lubes-1_1024x.jpg';
import stickerImage from '../../public/img/stickers-2_1024x.jpg';

const Main = () => {

    const { product } = useContext(ProductContext);
    const [newProducts, setNewProducts] = useState([]);
    const [populateProducts, setPopulateProducts] = useState([]);

    useEffect(() => {
        const fetchNewProducts = async () => {
            const res = await getNewestProduct();
            setNewProducts(res)
        }
        fetchNewProducts();
        const fetchPopulateProducts = async () => {
            const res = await getPopulateProduct();
            setPopulateProducts(res)
        }
        fetchPopulateProducts();
    }, []);

    return (
        <>
            <CarouselSlider />
            <div style={{ padding: '0 48px' }}>
                <Section loading={product.loading} title={"Sản phẩm mới"} products={newProducts} />
                <Section loading={product.loading} title={"Sản phẩm phổ biến"} products={populateProducts} />
                <SectionCategory
                    link={"/collection/Cosmic-Lube"}
                    image={lubeImage}
                    imageLeft
                    title={"Bạn muốn khối rubik của bạn mượt hơn?"}
                    content={`Dầu bôi trơn sẽ giúp kéo dài tuổi thọ khối rubik của bạn và tằng độ mượt.
                    Dễ sử dụng, thời gian duy trì lâu.`}
                />
                <SectionCategory
                    link={"/collection/Phu-kien-chinh-sua"}
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