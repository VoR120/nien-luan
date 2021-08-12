import { FormHelperText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { adminLogin } from '../../../action/authAction';
import { getAllCategory } from '../../../action/categoryAction';
import Layout from '../../../component/Layout/Layout';
import { AuthContext } from '../../../contextAPI/AuthContext';
import { CategoryContext } from '../../../contextAPI/CategoryContext';
import { ProductContext } from '../../../contextAPI/ProductContext';
import { getAllProduct } from '../../../action/productAction';
import { getInitialData } from '../../../action/initialData';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { user, dispatch } = useContext(AuthContext);
  const { categoryDispatch } = useContext(CategoryContext);
  const { productDispatch } = useContext(ProductContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await adminLogin(dispatch, { email, password });
    if (res == undefined) return;
    if (!res.user) return;
    history.push('/admin');
  }

  useEffect(() => {
    if (user.isAuthenticated == true)
      return <Redirect to="/admin" />
    if (user.error != null) {
      setError(true);
      setErrorMsg(user.error.msg);
    }
  }, [user])

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
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          // helperText={errorMsg}
          // error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          // helperText={errorMsg}
          // error={error}
          />
          <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Nhớ mật khẩu"
          />
          <FormHelperText
            className={classes.errorMsg}
            error={error}
            variant="outlined"
          >
            {errorMsg}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng nhập
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

// const Copyright = () => {
//     return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         <Link color="inherit" href="https://material-ui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }

export default ALogin;