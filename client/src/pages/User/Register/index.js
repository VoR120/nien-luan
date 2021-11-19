import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../contextAPI/UserContext';
import { userRegister } from '../../../action/userAction';
import { SnackbarContent } from '@mui/material';
import { SnackbarContext } from '../../../contextAPI/SnackbarContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMsg: {
        fontSize: '0.9rem'
    }
}));


export const Register = () => {
    const classes = useStyles();
    const { user, dispatch } = useContext(UserContext);
    const { openSnackbarDispatch } = useContext(SnackbarContext);
    const history = useHistory();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        userRegister(dispatch, data, openSnackbarDispatch);
        history.push('/')
    };

    useEffect(() => {
        if (user.error != 'null') {
            if (user.error == "email") {
                setError("email", {
                    type: 'manual',
                    message: user.message
                })
            }
            if (user.error == "phoneNumber") {
                setError("phoneNumber", {
                    type: 'manual',
                    message: user.message
                })
            }
        }
    }, [user])

    useEffect(() => {
        if (user.loading) {
            clearErrors("email");
            clearErrors("phoneNumber");
        }
    }, [user.loading])


    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h3">
                    Đăng ký tài khoản
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("fullName", {
                                    required: "Vui lòng nhập họ tên!",
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên"
                                name="fullName"
                                value="Vo Nguyen"
                                autoComplete="fullName"
                                error={Boolean(errors.fullName)}
                                helperText={errors.fullName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("birth", {
                                    required: "Vui lòng chọn ngày sinh!",
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="date"
                                id="birth"
                                label="Ngày sinh"
                                name="birth"
                                value="1991-02-02"
                                autoComplete="birth"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                error={Boolean(errors.birth)}
                                helperText={errors.birth?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("address", {
                                    required: "Vui lòng nhập địa chỉ!",
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Địa chỉ"
                                value="abc"
                                name="address"
                                autoComplete="address"
                                error={Boolean(errors.address)}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("email", {
                                    required: "Vui lòng nhập email",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Email không hợp lệ!'
                                    }
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register("phoneNumber", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                        message: "Số điện thoại không hợp lệ!"
                                    }
                                })}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Số điện thoại"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="password"
                                type="password"
                                variant="outlined"
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="passwordConfirm"
                                label="Nhập lại mật khẩu"
                                type="password"
                                id="passwordConfirm"
                                placeholder="Enter"
                                {...register("passwordConfirm", {
                                    required: "Vui lòng nhập mật khẩu!",
                                    validate: value =>
                                        value === password.current || "The passwords do not match"
                                })}
                                error={Boolean(errors.passwordConfirm)}
                                helperText={errors.passwordConfirm?.message}
                            />
                        </Grid>
                    </Grid>

                    {/* <FormHelperText
                        className={classes.errorMsg}
                        error={error}
                        variant="outlined"
                    >
                        {errorMsg}
                    </FormHelperText> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    // onClick={handleSubmit(onSubmit)}
                    >
                        Đăng ký
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên mật khẩu
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Chưa có tài khoản? Đăng ký"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
        <Copyright />
      </Box> */}
        </Container>
    );
}

export default Register;