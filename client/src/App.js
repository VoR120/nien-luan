import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { isAdminLogin } from "./action/authAction";
import { getAllCategory } from "./action/categoryAction";
import { getInitialData } from "./action/initialData";
import RouteList from "./config/routesConfig";
import { AuthContext } from "./contextAPI/AuthContext";
import { CategoryContext } from "./contextAPI/CategoryContext";
import { ProductContext } from "./contextAPI/ProductContext";
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
  const { user, dispatch } = useContext(AuthContext);
  const { category, categoryDispatch } = useContext(CategoryContext);
  const { productDispatch } = useContext(ProductContext);

  useEffect(() => {
    isAdminLogin(dispatch)
    if (!user.isAuthenticated) {
      return <Redirect to="/admin/login" />
    }
  }, [])

  useEffect(() => {
    if (user.isAuthenticated)
      getInitialData(categoryDispatch, productDispatch);
  }, [user])

  return (
    <div className="App">
      <Router>
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
