import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import OrderSummary from '../OrderSummary';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn'
import ReactHookFormSelect from '../ReactHookFormSelect';

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
    const provinceAPI = getProvinces();

    const [info, setInfo] = useState(props.info || '');
    // const [info, setInfo] = useState(JSON.parse(localStorage.getItem('info_Vshop')) || '');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [districtArr, setDistrictArr] = useState('');
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        setInfo(data);
        // localStorage.setItem("info_Vshop", JSON.stringify(data));
        props.setInfo(data);
        props.nextStep();
    }

    const handleChangeProvince = (e) => {
        setProvince(e.target.value);
        setValue("province", e.target.value);
    }

    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value);
        setValue("district", e.target.value);
    }
    useEffect(() => {
        setProvince(info.province);
        setDistrict(info.district)
        setValue("province", info.province)
        setValue("district", info.district)
    }, [])

    useEffect(() => {
        setDistrictArr(getDistrictsByProvinceCode(province))
    }, [province])

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <Typography className={classes.header} variant="h2">
                    Thông tin giao hàng
                </Typography>
            </Grid>
            <Grid item container xs={8} fullWidth>
                <form>
                    <FormControl margin="dense" fullWidth>
                        <Grid container spacing={2}>
                            <Grid className={classes.input} item xs={6}>
                                <TextField
                                    {...register("firstName", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                    fullWidth
                                    label="Tên"
                                    variant="outlined"
                                    value={info.firstName}
                                />
                                {errors?.firstName?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={6}>
                                <TextField
                                    {...register("lastName", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                    fullWidth
                                    label="Họ"
                                    variant="outlined"
                                    value={info.lastName}
                                />
                                {errors?.lastName?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={6}>
                                <Controller
                                    control={control}
                                    {...register("province", { required: true })}
                                    render={({field: { value, name }}) => (
                                        <TextField value={province} onChange={handleChangeProvince} select fullWidth variant="outlined" labelId="province-label" label="Tỉnh">
                                            <MenuItem>Tỉnh</MenuItem>
                                            {provinceAPI.map((pro) =>
                                            (
                                                <MenuItem key={pro.code} value={pro.code}>{pro.name}</MenuItem>
                                            )
                                            )}
                                        </TextField>
                                    )}
                                    className="province"
                                    name="province"
                                />
                                {errors?.province?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={6}>
                                <Controller
                                    control={control}
                                    {...register("district", { required: true })}
                                    render={() => (
                                        <TextField value={district} onChange={handleChangeDistrict} select fullWidth variant="outlined" labelId="district-label" label="Huyện">
                                            <MenuItem>Huyện</MenuItem>
                                            {districtArr ? districtArr.map((pro) =>
                                            (
                                                <MenuItem key={pro.code} value={pro.code}>{pro.name}</MenuItem>
                                            )
                                            ) : ''}
                                        </TextField>
                                    )}
                                    className="district"
                                    name="district"
                                />
                                {errors?.district?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    {...register("address", {
                                        required: true,
                                        pattern: /^[A-Za-z]+$/i,
                                    })}
                                    fullWidth
                                    label="Địa chỉ cụ thể"
                                    variant="outlined"
                                    value={info.address}
                                />
                                {errors?.address?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={6}>
                                <TextField
                                    {...register("phone", {
                                        required: true,
                                        pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                    })}
                                    fullWidth
                                    label="Số điện thoại"
                                    variant="outlined"
                                    value={info.phone}
                                />
                                {errors?.phone?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập số điện thoại!</FormHelperText>
                                }
                                {errors?.phone?.type === "pattern" &&
                                    <FormHelperText error>Số điện thoại không hợp lệ!</FormHelperText>
                                }
                            </Grid>
                            <Grid className={classes.input} item xs={6}>
                                <TextField
                                    {...register("email", {
                                        required: true,
                                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    })}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    value={info.email}

                                />
                                {errors?.email?.type === "required" &&
                                    <FormHelperText error>Vui lòng nhập email!</FormHelperText>
                                }
                                {errors?.email?.type === "pattern" &&
                                    <FormHelperText error>Email không hợp lệ!</FormHelperText>
                                }
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>

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
                <OrderSummary delivery province={province} />
                <Button onClick={handleSubmit(onSubmit)} className={classes.mainBtn} fullWidth>Thanh toán</Button>
            </Grid>
        </Grid>
    );
};

export default Delivery;