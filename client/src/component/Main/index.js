import React from 'react';
import CarouselSlider from '../../component/Carousel';
import Section from '../../component/Section';
import SectionCategory from '../../component/SectionCategory';
import lubeImage from '../../public/img/cosmic-lubes-1_1024x.jpg'
import stickerImage from '../../public/img/stickers-2_1024x.jpg'

const Main = () => {
    return (
        <>
            <CarouselSlider />
            <div style={{ padding: '0 48px' }}>
                <Section title={"Sản phẩm mới"} />
                <Section title={"Sản phẩm phổ biến"} />
                <SectionCategory
                    image={lubeImage}
                    imageLeft
                    title={"Bạn muốn khối rubik của bạn mượt hơn?"}
                    content={`Dầu bôi trơn sẽ giúp kéo dài tuổi thọ khối rubik của bạn và tằng độ mượt.
                    Dễ sử dụng, thời gian duy trì lâu.`}
                />
                <SectionCategory
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