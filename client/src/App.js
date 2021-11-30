import { Backdrop, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { isAdminLogin } from "./action/authAction";
import { getCart } from "./action/cartAction";
import { getInitialData } from "./action/initialData";
import { getAllOrder } from "./action/orderAction";
import { isUserLogin } from "./action/userAction";
import ScrollToTop from "./component/HOC/ScrollToTop";
import RouteList from "./config/routesConfig";
import { AuthContext } from "./contextAPI/AuthContext";
import { CartContext } from "./contextAPI/CartContext";
import { CategoryContext } from "./contextAPI/CategoryContext";
import { OrderAdminContext } from "./contextAPI/OrderAdminContext";
import { ProductContext } from "./contextAPI/ProductContext";
import { UserContext } from "./contextAPI/UserContext";
import { routes } from "./pages/routes";
import './App.scss'
import { getAllProduct } from "./action/productAction";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    background: '#fff',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();
  const { aUser, aDispatch } = useContext(AuthContext);
  const { user, dispatch } = useContext(UserContext);
  const { categoryDispatch } = useContext(CategoryContext);
  const { orderAdminDispatch } = useContext(OrderAdminContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { productDispatch } = useContext(ProductContext);

  useEffect(() => {
    isAdminLogin(aDispatch)
    if (!aUser.isAuthenticated) {
      return <Redirect to="/admin/login" />
    }
  }, [])

  useEffect(() => {
    if (aUser.isAuthenticated) {
      getInitialData(categoryDispatch, productDispatch);
      getAllOrder(orderAdminDispatch);
    }
  }, [aUser.isAuthenticated])

  useEffect(() => {
    isUserLogin(dispatch)
    getAllProduct(productDispatch);
    getCart(cartDispatch)
    if (!user.isAuthenticated) {
      return <Redirect to="/login" />
    }
  }, [])

  useEffect(() => {
    if (user.isAuthenticated) {
      getCart(cartDispatch)
    }
  }, [user])

  // useEffect(() => {
  //   if (!user.isAuthenticated)
  //     localStorage.setItem("cart", JSON.stringify(cart.cartObj))
  // }, [cart.cartObj])

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Suspense
            fallback={
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="primary" />
              </Backdrop>
            }
          >
            <RouteList routes={routes} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
