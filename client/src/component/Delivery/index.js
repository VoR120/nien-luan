import { makeStyles, Typography, FormControl, FormGroup, FormHelperText, FormLabel, TextField, Grid, Button, Select, MenuItem, InputLabel, Paper } from '@material-ui/core';
import React from 'react';
import OrderSummary from '../OrderSummary';

const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        marginBottom: '20px',
        fontWeight: '500',
    },
    input: {
        marginBottom: '16px',
    },
    paper: {
        padding: '20px'
    },
    priceSpan: {
        float: 'right',
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

const Delivery = (props) => {
    const classes = useStyles();
    const handleSubmit = () => {
        props.nextStep();
    }
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Typography className={classes.header} variant="h2">
                    Thông tin giao hàng
                </Typography>
            </Grid>
            <Grid item container xs={8} fullWidth>
                <FormControl margin="dense" fullWidth>
                    <Grid container spacing={2}>
                        <Grid className={classes.input} item xs={6}>
                            <TextField fullWidth label="Họ" variant="outlined" />
                            <FormHelperText></FormHelperText>
                        </Grid>
                        <Grid className={classes.input} item xs={6}>
                            <TextField fullWidth label="Tên" variant="outlined" />
                            <FormHelperText />
                        </Grid>
                        <Grid className={classes.input} item xs={6}>
                            <TextField select fullWidth label="Tỉnh" variant="outlined">
                                <MenuItem value="1">None</MenuItem>
                                <MenuItem value="2">None</MenuItem>
                                <MenuItem value="3">None</MenuItem>
                            </TextField>
                            <FormHelperText></FormHelperText>
                        </Grid>
                        <Grid className={classes.input} item xs={6}>
                            <TextField select fullWidth label="Huyện" variant="outlined">
                                <MenuItem value="1">None</MenuItem>
                                <MenuItem value="2">None</MenuItem>
                                <MenuItem value="3">None</MenuItem>
                            </TextField>
                            <FormHelperText></FormHelperText>
                        </Grid>
                        <Grid className={classes.input} item xs={12}>
                            <TextField fullWidth label="Địa chỉ cụ thể" variant="outlined" />
                            <FormHelperText />
                        </Grid>
                        <Grid className={classes.input} item xs={6}>
                            <TextField fullWidth label="Số điện thoại" variant="outlined" />
                            <FormHelperText />
                        </Grid>
                        <Grid className={classes.input} item xs={6}>
                            <TextField fullWidth label="Email" variant="outlined" />
                            <FormHelperText />
                        </Grid>
                    </Grid>
                </FormControl>
                <Grid xs={12}>
                    <Typography className={classes.header} variant="h2">
                        Vận chuyển
                    </Typography>
                    <Paper className={classes.paper} square variant="outlined">
                        <Typography className={classes.header} variant="h5">Giao hàng tiêu chuẩn<span className={classes.priceSpan}>30.000 VND</span></Typography>
                        <Typography variant="h5">Vận chuyển trong khu vực tỉnh Cần Thơ: Miễn phí</Typography>
                        <Typography variant="h5">Vận chuyển ngoài tỉnh với đơn &gt; 300.000 VND: Miễn phí</Typography>
                        <Typography variant="h5">Vận chuyển ngoài tỉnh: 30.000 VND</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <OrderSummary />
                <Button onClick={handleSubmit} className={classes.mainBtn} fullWidth>Thanh toán</Button>
            </Grid>
        </Grid>
    );
};

export default Delivery;