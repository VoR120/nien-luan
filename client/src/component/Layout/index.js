import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import CustomizedSnackbars from '../MySnackbar';

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
            <CustomizedSnackbars />
        </>
    );
};

export default Layout;