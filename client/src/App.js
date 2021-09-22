import { Backdrop, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { isAdminLogin } from "./action/authAction";
import { getAllCategory } from "./action/categoryAction";
import { getAllOrder } from "./action/orderAction";
import { getInitialData } from "./action/initialData";
import { getAllProduct } from "./action/productAction";
import { clearCart, getCart } from "./action/cartAction";
import { isUserLogin } from "./action/userAction";
import ScrollToTop from "./component/HOC/ScrollToTop";
import RouteList from "./config/routesConfig";
import { AuthContext } from "./contextAPI/AuthContext";
import { CartContext } from "./contextAPI/CartContext";
import { CategoryContext } from "./contextAPI/CategoryContext";
import { ProductContext } from "./contextAPI/ProductContext";
import { OrderAdminContext } from "./contextAPI/OrderAdminContext";
import { UserContext } from "./contextAPI/UserContext";
import { routes } from "./pages/routes";

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
  const { category, categoryDispatch } = useContext(CategoryContext);
  const { orderAdmin, orderAdminDispatch } = useContext(OrderAdminContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { productDispatch } = useContext(ProductContext);

  useEffect(() => {
    isAdminLogin(aDispatch)
    if (!aUser.isAuthenticated) {
      return <Redirect to="/admin/login" />
    }
  }, [])

  useEffect(() => {
    isUserLogin(dispatch)
    getCart(cartDispatch)
    if (!user.isAuthenticated) {
      return <Redirect to="/login" />
    }
  }, [])

  useEffect(() => {
    if (aUser.isAuthenticated)
      getInitialData(categoryDispatch, productDispatch);
      getAllOrder(orderAdminDispatch);
  }, [aUser.isAuthenticated])

  useEffect(() => {
    if (user.isAuthenticated) {
      getCart(cartDispatch)
    } else
      localStorage.setItem('cart', JSON.stringify(cart.cartObj));
  }, [user])

  useEffect(() => {
    if (!user.isAuthenticated)
      localStorage.setItem("cart", JSON.stringify(cart.cartObj))
  }, [cart.cartObj])

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
