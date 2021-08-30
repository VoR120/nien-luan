import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        marginTop: '120px',
    },
    header: {
        marginBottom: '16px',
    },
    mainBtn: {
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 0',
        width: '30%',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    }
}))

const OrderSuccess = () => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <Paper className={classes.paper} elevation={0}>
            <Typography className={classes.header} variant="h2">Bạn đã đặt hàng thành công!</Typography>
            <Typography variant="h5">Đơn hàng sẽ được giao trong khoảng 7 ngày</Typography>
            <Typography variant="h5">Cảm ơn bạn đã tin tưởng và ủng hộ!</Typography>
            <Button onClick={() => history.push('/')} className={classes.mainBtn} fullWidth>Tiếp tục mua sắm</Button>
        </Paper>
    );
};

export default OrderSuccess;