import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { CartContext } from '../../contextAPI/CartContext';
import CheckOut from '../CheckOut';
import Delivery from '../Delivery';
import OrderSuccess from '../OrderSuccess';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        boxShadow: 'none',
        borderBottom: '2px solid #eee'
    },
    indicator: {
        borderBottom: '2px solid black'
    },
    numberIcon: {
        width: '20px',
        height: '20px',
        background: 'black',
        color: '#eee',
        borderRadius: '50%',
        lineHeight: '20px',
        marginRight: '6px',
    }
}));

const ProcessTab = () => {
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = useState(1);
    const { cart } = useContext(CartContext);
    const [info, setInfo] = useState('');
    const [checkout, setCheckout] = useState('');
    const [data, setData] = useState({ cart: cart.cartObj, info, checkout });
    console.log(data);

    useEffect(() => {
        setData({ cart: cart.cartObj, info, checkout });
    }, [cart, info, checkout])

    const nextStep = () => {
        setValue(value + 1);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const contentTab = (num, content) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={classes.numberIcon}>{num}</span>
                <Typography>{content}</Typography>
            </div>
        )
    }

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
            disabled: index > value ? true : false
        };
    }

    const handleRedirect = () => {
        history.push('/cart')
    }

    return (
        <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10} >
                <div className={classes.root}>
                    <AppBar className={classes.appBar} position="static" color="secondary">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="simple tabs example"
                            TabIndicatorProps={{ className: classes.indicator }}
                        >
                            <Tab onClick={handleRedirect} label={contentTab(1, "Giỏ hàng")} {...a11yProps(0)} />
                            <Tab label={contentTab(2, "Giao hàng")} {...a11yProps(1)} />
                            <Tab label={contentTab(3, "Thanh toán")} {...a11yProps(2)} />
                            <Tab label={contentTab(4, "Hoàn thành đơn hàng")} {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel onClick={<Redirect to="/cart" />} value={value} index={0}>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Delivery info={info} setInfo={setInfo} nextStep={nextStep} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CheckOut setCheckout={setCheckout} nextStep={nextStep} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <OrderSuccess />
                    </TabPanel>
                </div>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}

export default ProcessTab;