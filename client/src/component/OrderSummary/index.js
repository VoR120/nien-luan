import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: '20px'
    },
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        marginBottom: '20px',
    },
    sub: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0'
    },
    subTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
    },
    sumName: {
        maxWidth: '160px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}))

const OrderSummary = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper} square variant="outlined">
            <Typography className={classes.header} variant="h4">Tóm tắt đơn hàng</Typography>
            <Typography className={classes.sub}>
                <span className={classes.sumName}>GAN M Pro 3x3</span>
                <div>
                    <span style={{ margin: '20px' }}>x1</span>
                    <span>1.000.000 VND</span>
                </div>
            </Typography>
            <Typography className={classes.sub}>
                <span className={classes.sumName}>GAN M Pro 3x3</span>
                <div>
                    <span style={{ margin: '20px' }}>x1</span>
                    <span>1.000.000 VND</span>
                </div>
            </Typography>
            <Typography className={classes.sub}>
                <span className={classes.sumName}>Phí vận chuyển</span>
                <div>
                    <span>Miễn phí</span>
                </div>
            </Typography>
            <Divider />
            <Typography className={classes.subTotal}>
                <span className={classes.sumName}>Tổng</span>
                <Typography variant="h3">
                    2.000.000 VND
                </Typography>
            </Typography>
        </Paper>
    );
};

export default OrderSummary;