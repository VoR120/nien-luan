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
import { AuthContext } from '../../../contextAPI/AuthContext';

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


export const ALogin = () => {
  const classes = useStyles();
  const { aUser, aDispatch } = useContext(AuthContext);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (aUser.isAuthenticated == true)
        history.push('/product')
  }, [aUser.isAuthenticated])

  useEffect(() => {
    if (aUser.error != 'null') {
      if (aUser.error == "email") {
        setError("email", {
          type: 'manual',
          message: aUser.message
        })
      }
      if (aUser.error == "password") {
        setError("password", {
          type: 'manual',
          message: aUser.message
        })
      }
    }
  }, [aUser])

  useEffect(() => {
    if (aUser.loading) {
      clearErrors("email");
      clearErrors("password");
    }
  }, [aUser.loading])

  const onSubmit = (data) => {
    adminLogin(aDispatch, data);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Đăng nhập Admin
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
            // value=""
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Nhớ mật khẩu"
          />
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
              <NavLink color="primary" to="/register" variant="body2">
                {"Chưa có tài khoản? Đăng ký"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default ALogin;