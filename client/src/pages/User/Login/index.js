import { FormHelperText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { adminLogin } from '../../../action/authAction';
import { UserContext } from '../../../contextAPI/UserContext';
import { SnackbarContext } from '../../../contextAPI/SnackbarContext';
import { CartContext } from '../../../contextAPI/CartContext';
import { userLogin } from '../../../action/userAction';
import { getCart } from '../../../action/cartAction';

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


export const Login = () => {
  const classes = useStyles();
  const { user, dispatch } = useContext(UserContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { openSnackbarDispatch } = useContext(SnackbarContext);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (user.isAuthenticated)
      history.push('/')
  }, [user.isAuthenticated])

  useEffect(() => {
    if (user.error != 'null') {
      if (user.error == "email") {
        setError("email", {
          type: 'manual',
          message: user.message
        })
      }
      if (user.error == "password") {
        setError("password", {
          type: 'manual',
          message: user.message
        })
      }
    }
  }, [user])

  useEffect(() => {
    if (user.loading) {
      clearErrors("email");
      clearErrors("password");
    }
  }, [user.loading])

  const onSubmit = (data) => {
    userLogin(dispatch, data, openSnackbarDispatch);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Đăng nhập
        </Typography>
        <form className={classes.form} noValidate>
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
          <TextField
            {...register("password", {
              required: "Vui lòng nhập mật khẩu!",
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Nhớ mật khẩu"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Đăng nhập
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu
              </Link>
            </Grid> */}
            <Grid item>
              <NavLink to="/register" variant="body2">
                {"Chưa có tài khoản? Đăng ký"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;