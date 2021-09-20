import {
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import OrderSummary from '../OrderSummary';

const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        marginBottom: '20px',
        fontWeight: '500',
    },
    paper: {
        padding: '20px',
        marginBottom: '8px',
        width: '100%',
    },
    mainBtn: {
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 0',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    }
}))

const CheckOut = (props) => {
    const classes = useStyles();
    const [checkOut, setCheckOut] = useState("paymentAfterArrival")
    const handleSubmit = () => {
        props.setCheckout(checkOut);
        props.nextStep();
    }
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Typography className={classes.header} variant="h2">
                    Phương thức thanh toán
                </Typography>
            </Grid>
            <Grid item xs={8} fullWidth>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="checkout" name="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)}>
                        <FormControlLabel
                            value="paymentAfterArrival"
                            control={<Radio color="primary" />}
                            label={
                                <Paper className={classes.paper} square variant="outlined">
                                    <Typography variant="h5">Thanh toán khi  nhận hàng</Typography>
                                </Paper>
                            }
                        />
                        <FormControlLabel
                            value="paypal"
                            control={<Radio color="primary" />}
                            label={
                                <Paper className={classes.paper} square variant="outlined">
                                    <Typography variant="h5">Paypal</Typography>
                                </Paper>
                            }
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <OrderSummary delivery />
                <Button onClick={handleSubmit} className={classes.mainBtn} fullWidth>Đặt hàng</Button>
            </Grid>
        </Grid>
    );
};

export default CheckOut;