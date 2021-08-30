import React from 'react';
import Footer from '../Footer';
import Header from '../Header';

const Layout = (props) => {
    return (
        <>
            {props.headfoot ? (
                <>
                    <Header />
                    <div style={{ marginTop: '108px' }}>
                        {props.children}
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    {props.children}
                </>

            )
            }
        </>
    );
};

export default Layout;