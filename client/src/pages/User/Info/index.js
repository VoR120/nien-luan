import { Grid, TextField, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect, useRef } from 'react';
import BreadcrumbsDiv from '../../../component/BreadcrumbsDiv';
import { UserContext } from '../../../contextAPI/UserContext'
import { AddressContext } from '../../../contextAPI/AddressContext'
import { SnackbarContext } from '../../../contextAPI/SnackbarContext'
import Layout from '../../../component/Layout';
import { getAddress } from '../../../action/addressAction';
import { useForm } from 'react-hook-form';
import Loading from '../../../component/Loading';
import { changePassword } from '../../../action/userAction';
import DeleteAddressForm from '../../../component/DeleteAddressForm';
const useStyles = makeStyles(theme => ({
    header: {
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '3px',
        marginBottom: theme.spacing(5),
    },
    headerAcc: {
        textTransform: 'uppercase',

    },
    item: {
        margin: '10px 0',
    },
    underline: {
        textDecoration: 'underline'
    },
    deleteline: {
        textDecoration: 'underline',
        color: theme.palette.error.main
    }
}))

const Info = () => {
    const classes = useStyles();
    const { user, userDispatch } = useContext(UserContext);
    const { address, addressDispatch } = useContext(AddressContext)
    const { openSnackbarDispatch } = useContext(SnackbarContext)
    const { email, fullName, phoneNumber } = user.userDetails

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const newPassword = useRef({});
    newPassword.current = watch("newPassword", "");

    const onSubmit = async (data) => {
        const res = await changePassword(data);
        console.log(res);
        if (res.error) {
            setError(res.type, {
                type: "manual",
                message: res.error
            })
        } else {
            reset({
                password: "",
                newPassword: "",
                passwordConfirm: ""
            });
            openSnackbarDispatch({
                type: 'SET_OPEN',
                payload: {
                    msg: res.msg,
                    type: "success"
                }
            })
        }
    }

    useEffect(() => {
        getAddress(addressDispatch);
    }, [])

    return (
        <Layout headfoot>
            <BreadcrumbsDiv link={"/info"} content={"Thông tin"} />
            <Grid container>
                <Grid item xs={3} />
                <Grid item xs={6} >
                    <Typography className={classes.header} variant="h3" color="initial">Thông tin</Typography>
                    <Accordion variant="outlined" square>
                        <AccordionSummary

                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.headerAcc}>Thông tin</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid className={classes.item} container>
                                <Grid item xs={3}>Họ tên</Grid>
                                <Grid item xs={8}>{fullName}</Grid>
                            </Grid>
                            <Grid className={classes.item} container>
                                <Grid item xs={3}>Email</Grid>
                                <Grid item xs={9}>{email}</Grid>
                            </Grid>
                            <Grid className={classes.item} container>
                                <Grid item xs={3}>Số điện thoại</Grid>
                                <Grid item xs={9}>{phoneNumber}</Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion variant="outlined" square>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.headerAcc}>Thông tin giao hàng</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {address?.address.length > 0 &&
                                address.address.map((el, index) =>
                                    <Grid className={classes.item} key={index} container>
                                        <Grid item xs={3}>{index + 1}</Grid>
                                        <Grid item xs={8}>
                                            <Grid container>
                                                <Grid item xs={3}>Họ tên:</Grid>
                                                <Grid item xs={9}>{el.name}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={3}>Địa chỉ:</Grid>
                                                <Grid item xs={9}>{el.address}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={3}>Số điện thoại:</Grid>
                                                <Grid item xs={9}>{el.phoneNumber}</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <DeleteAddressForm id={el._id} />
                                        </Grid>
                                    </Grid>

                                )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion variant="outlined" square>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography className={classes.headerAcc}>Đổi mật khẩu</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid alignItems="center" className={classes.item} container>
                                <Grid item xs={4}>Nhập mật khẩu hiện tại</Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        name="password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Mật khẩu"
                                        id="password"
                                        {...register("password", {
                                            required: "Vui lòng nhập mật khẩu!",
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid alignItems="center" className={classes.item} container>
                                <Grid item xs={4}>Nhập mật khẩu mới</Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        name="newPassword"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Mật khẩu"
                                        id="newPassword"
                                        {...register("newPassword", {
                                            required: "Vui lòng nhập mật khẩu!",
                                        })}
                                        error={Boolean(errors.newPassword)}
                                        helperText={errors.newPassword?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid alignItems="center" className={classes.item} container>
                                <Grid item xs={4}>Xác nhận mật khẩu</Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        margin="normal"
                                        fullWidth
                                        name="passwordConfirm"
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        id="passwordConfirm"
                                        {...register("passwordConfirm", {
                                            required: "Vui lòng nhập mật khẩu!",
                                            validate: value =>
                                                value === newPassword.current || "Mật khẩu nhập lại không đúng!"
                                        })}
                                        error={Boolean(errors.passwordConfirm)}
                                        helperText={errors.passwordConfirm?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid alignItems="center" className={classes.item} container>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={8}>
                                    <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Xác nhận</Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={3} />
            </Grid>
            <Loading open={address.loading} />
        </Layout>
    );
};

export default Info;