import { default as React, useContext, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { getCart } from "../../../action/cartAction";
import { getAllProduct } from "../../../action/productAction";
import { isUserLogin } from "../../../action/userAction";
import Layout from '../../../component/Layout';
import Main from '../../../component/Main';
import MySnackBar from '../../../component/UI/MySnackBar';
import { CartContext } from "../../../contextAPI/CartContext";
import { ProductContext } from "../../../contextAPI/ProductContext";
import { UserContext } from "../../../contextAPI/UserContext";

const Home = () => {

  const [open, setOpen] = useState(false)

  const { user, dispatch } = useContext(UserContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { product, productDispatch } = useContext(ProductContext);

  return (
    <Layout headfoot>
      <Main />
      <MySnackBar open={open} setOpen={setOpen} content="Đăng nhập thành công!" />
    </Layout>
  );
};

export default Home;