import { Button, FormControl, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
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
    const [value, setValue] = useState("nhanhang");
    const handleSubmit = () => {
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
                    <RadioGroup aria-label="checkout" name="checkout" value={value} onChange={e => setValue(e.target.value)}>
                        <FormControlLabel
                            value="nhanhang"
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
                <OrderSummary />
                <Button onClick={handleSubmit} className={classes.mainBtn} fullWidth>Đặt hàng</Button>
            </Grid>
        </Grid>
    );
};

export default CheckOut;