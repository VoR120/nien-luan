import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add'
import OrderSummary from '../OrderSummary';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { getProvinces, getDistrictsByProvinceCode } from 'sub-vn'
import ReactHookFormSelect from '../ReactHookFormSelect';
import { UserContext } from '../../contextAPI/UserContext';
import { AddressContext } from '../../contextAPI/AddressContext';
import { getAddress, clearAddress, addAddress } from '../../action/addressAction';
import NumberFormat from 'react-number-format';
import './style.scss'
import Loading from '../Loading';

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
    mainBtn: () => ({
        margin: '20px 0',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        padding: '10px 0',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        }
    }),
    address: {
        width: '100%'
    },
    formRadio: {
        margin: '8px 0',
    },
    menuList: {
        padding: '0',
    }
}))

const Delivery = (props) => {
    const provinceAPI = getProvinces();
    const { user } = useContext(UserContext);
    const { address, addressDispatch } = useContext(AddressContext);
    const [addressId, setAddressId] = useState(props.addressId || '');
    const classes = useStyles();
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [districtArr, setDistrictArr] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [addressChoose, setAddressChoose] = useState(null);
    const [deliveryPrice, setDeliveryPrice] = useState(30000);
    const [provinceChoose, setProvinceChoose] = useState(null);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        clearErrors,
        formState: { errors }
    } = useForm();

    const handleAddAddress = (data) => {
        setLoading(true);
        const provinceName = provinceAPI.filter(p => p.code === data.province);
        const districtName = districtArr.filter(d => d.code === data.district);
        addAddress(addressDispatch,
            {
                payload: {
                    address:
                    {
                        name: data.lastName + " " + data.firstName,
                        phoneNumber: data.phone,
                        address: data.locality,
                        district: districtName[0].name,
                        province: provinceName[0].name,
                    }
                }
            }
        )
        setShowForm(false);
        setLoading(false)
    }

    const onSubmit = () => {
        setAddressId(addressChoose);
        props.setAddressId(addressChoose);
        props.nextStep();
    }

    const handleChangeProvince = (e) => {
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
        setProvince(e.target.value);
        setValue("province", e.target.value);
    }

    const handleChangeDistrict = (e) => {
        if (e.target.value != "0") {
            clearErrors(e.target.name)
        }
        setDistrict(e.target.value);
        setValue("district", e.target.value);
    }

    const handleChangeAddress = (e, a) => {
        setShowForm(false);
        setProvinceChoose(a.province)
    }

    useEffect(() => {
        getAddress(addressDispatch);
    }, [])

    useEffect(() => {
        setDistrictArr(getDistrictsByProvinceCode(province))
    }, [province])

    return (
        <>
            <Grid className="delivery-page" container spacing={2}>
                <Grid xs={12}>
                    <Typography className={classes.header} variant="h2">
                        Thông tin giao hàng
                    </Typography>
                </Grid>
                <Grid item container xs={8} fullWidth>
                    <div className={classes.address}>
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <RadioGroup onChange={(e) => setAddressChoose(e.target.value)} value={addressChoose} aria-label="checkout" name="checkout">
                                {address &&
                                    address.address.map((a) => {
                                        return (
                                            <FormControlLabel
                                                onClick={(e) => handleChangeAddress(e, a)}
                                                key={a._id}
                                                className={classes.formRadio}
                                                value={a._id}
                                                control={<Radio color="primary" />}
                                                label={
                                                    <Paper style={{ width: '100%' }} className={classes.paper} square variant="outlined">
                                                        <Typography>Họ tên: {a.name}</Typography>
                                                        <Typography>Địa chỉ: {a.address + ", " + a.district + ", " + a.province}</Typography>
                                                        <Typography>Số điện thoại: {a.phoneNumber} </Typography>
                                                    </Paper>
                                                }
                                            />
                                        )
                                    })
                                }
                                <FormControlLabel
                                    className={classes.formRadio}
                                    onClick={() => setShowForm(true)}
                                    value=""
                                    control={<Radio color="primary" />}
                                    label={
                                        <Paper style={{ width: '100%', display: 'flex', alignItems: 'center' }} className={classes.paper} square variant="outlined">
                                            <AddIcon style={{ marginRight: '8px' }} />
                                            Thêm thông tin giao hàng
                                        </Paper>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {showForm && (
                        <form>
                            <FormControl margin="dense" fullWidth>
                                <Grid container spacing={2}>
                                    <Grid className={classes.input} item xs={6}>
                                        <Controller
                                            name={"firstName"}
                                            control={control}
                                            errors={errors}
                                            defaultValue=""
                                            rules={{ required: "Vui lòng nhập trường này" }}
                                            render={({ field }) =>
                                                <TextField
                                                    label="Tên"
                                                    {...field}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.firstName}
                                                    helperText={errors.firstName?.message}
                                                />

                                            }
                                        />

                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <Controller
                                            name={"lastName"}
                                            control={control}
                                            errors={errors}
                                            defaultValue=""
                                            rules={{ required: "Vui lòng nhập trường này" }}
                                            render={({ field }) =>
                                                <TextField
                                                    label="Họ"
                                                    {...field}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.lastName}
                                                    helperText={errors.lastName?.message}
                                                />

                                            }
                                        />
                                        {/* <TextField
                                        {...register("lastName", {
                                            required: true,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        fullWidth
                                        label="Họ"
                                        variant="outlined"
                                    />
                                    {errors?.lastName?.type === "required" &&
                                        <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                    } */}
                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <Controller
                                            name={"province"}
                                            control={control}
                                            errors={errors}
                                            defaultValue="0"
                                            rules={{
                                                validate: value =>
                                                    value != "0" || "Vui lòng nhập trường này!"
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    select
                                                    {...field}
                                                    onChange={handleChangeProvince}
                                                    // value={value}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.province}
                                                    helperText={errors.province?.message}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            MenuListProps: {
                                                                className: classes.menuList
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="0">Tỉnh</MenuItem>
                                                    {provinceAPI.map((pro) =>
                                                    (
                                                        <MenuItem key={pro.code} value={pro.code}>{pro.name}</MenuItem>
                                                    )
                                                    )}
                                                </TextField>
                                            )}
                                        />
                                        {/* <Controller
                                        control={control}
                                        {...register("province", { required: true })}
                                        defaultValue="0"
                                        render={({ field: { value, name } }) => (
                                            <TextField value={province} onChange={handleChangeProvince} select fullWidth variant="outlined" labelId="province-label" label="Tỉnh">
                                                <MenuItem value="0">Tỉnh</MenuItem>
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
                                    } */}
                                    </Grid>
                                    <Grid className={classes.input} item xs={6}>
                                        <Controller
                                            name={"district"}
                                            control={control}
                                            errors={errors}
                                            defaultValue="0"
                                            rules={{
                                                validate: value =>
                                                    value != "0" || "Vui lòng nhập trường này!"
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    select
                                                    {...field}
                                                    onChange={handleChangeDistrict}
                                                    // value={value}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.district}
                                                    helperText={errors.district?.message}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            MenuListProps: {
                                                                className: classes.menuList
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="0">Huyện</MenuItem>
                                                    {districtArr &&
                                                        districtArr.map((pro) =>
                                                            <MenuItem key={pro.code} value={pro.code}>{pro.name}</MenuItem>
                                                        )
                                                    }
                                                </TextField>
                                            )}
                                        />
                                        {/* <Controller
                                        control={control}
                                        defaultValue="0"
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
                                    } */}
                                    </Grid>
                                    <Grid className={classes.input} item xs={12}>
                                        <Controller
                                            name={"locality"}
                                            control={control}
                                            errors={errors}
                                            defaultValue=""
                                            rules={{ required: "Vui lòng nhập trường này" }}
                                            render={({ field }) =>
                                                <TextField
                                                    label="Địa chỉ cụ thể"
                                                    {...field}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.locality}
                                                    helperText={errors.locality?.message}
                                                />

                                            }
                                        />
                                        {/* <TextField
                                        {...register("locality", {
                                            required: true,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        fullWidth
                                        label="Địa chỉ cụ thể"
                                        variant="outlined"
                                    />
                                    {errors?.locality?.type === "required" &&
                                        <FormHelperText error>Vui lòng nhập trường này!</FormHelperText>
                                    } */}
                                    </Grid>
                                    <Grid className={classes.input} item xs={12}>
                                        <Controller
                                            name={"phone"}
                                            control={control}
                                            errors={errors}
                                            defaultValue=""
                                            rules={{
                                                required: "Vui lòng nhập trường này",
                                                pattern: {
                                                    value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                                    message: "Số điện thoại không hợp lệ"
                                                }
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    label="Số điện thoại"
                                                    {...field}
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors.phone}
                                                    helperText={errors.phone?.message}
                                                />

                                            }
                                        />
                                        {/* <TextField
                                        {...register("phone", {
                                            required: true,
                                            pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                        })}
                                        fullWidth
                                        label="Số điện thoại"
                                        variant="outlined"
                                    />
                                    {errors?.phone?.type === "required" &&
                                        <FormHelperText error>Vui lòng nhập số điện thoại!</FormHelperText>
                                    }
                                    {errors?.phone?.type === "pattern" &&
                                        <FormHelperText error>Số điện thoại không hợp lệ!</FormHelperText>
                                    } */}
                                    </Grid>
                                    <Grid className={classes.input} item xs={12}>
                                        <Button onClick={handleSubmit(handleAddAddress)} className={classes.mainBtn} fullWidth>Thêm</Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    )}

                    <Grid xs={12}>
                        <Typography className={classes.header} variant="h2">
                            Vận chuyển
                        </Typography>
                        <Paper className={classes.paper} square variant="outlined">
                            <Typography className={classes.header} variant="h5">Giao hàng tiêu chuẩn
                                <span className={classes.priceSpan}>
                                    {deliveryPrice === 0 ?
                                        <span>Miễn phí</span>
                                        :
                                        <span><NumberFormat value={deliveryPrice} displayType="text" thousandSeparator={true} suffix="₫" /></span>
                                    }
                                </span>
                            </Typography>
                            <Typography variant="h5">Vận chuyển trong khu vực tỉnh Cần Thơ: Miễn phí</Typography>
                            <Typography variant="h5">Vận chuyển ngoài tỉnh với đơn &gt; 300.000 VND: Miễn phí</Typography>
                            <Typography variant="h5">Vận chuyển ngoài tỉnh: 30.000 VND</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <OrderSummary
                        delivery
                        setDeliveryPrice={setDeliveryPrice}
                        provinceChoose={provinceChoose}
                    />
                    <Button disabled={addressChoose == null || showForm} onClick={handleSubmit(onSubmit)} className={classes.mainBtn} fullWidth>Thanh toán</Button>
                </Grid>
            </Grid>
            <Loading loading={loading} />
        </>
    );
};

export default Delivery;