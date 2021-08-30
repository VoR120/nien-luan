import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Grid, IconButton } from '@material-ui/core';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Delivery from '../Delivery';
import CheckOut from '../CheckOut';
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
                            <Tab onClick={() => history.push('/cart')} label={contentTab(1, "Giỏ hàng")} {...a11yProps(0)} />
                            <Tab label={contentTab(2, "Giao hàng")} {...a11yProps(1)} />
                            <Tab label={contentTab(3, "Thanh toán")} {...a11yProps(2)} />
                            <Tab label={contentTab(4, "Hoàn thành đơn hàng")} {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel onClick={<Redirect to="/cart" />} value={value} index={0}>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Delivery setValue={setValue} nextStep={nextStep} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CheckOut setValue={setValue} nextStep={nextStep} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <OrderSuccess setValue={setValue} nextStep={nextStep} />
                    </TabPanel>
                </div>
            </Grid>
            <Grid item xs={1} />
        </Grid>
    );
}

export default ProcessTab;