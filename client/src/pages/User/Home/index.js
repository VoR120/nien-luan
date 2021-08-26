import React from 'react';
import Banner from '../../../component/Banner';
import Header from '../../../component/Header';
import banner1 from '../../../public/img/banner1.jpg'

const Home = () => {
    return (
        <div>
            <Header />
            <Banner backgroundImage={banner1} />
        </div>
    );
};

export default Home;