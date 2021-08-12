import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { isAdminLogin } from "./action/authAction";
import { getAllCategory } from "./action/categoryAction";
import { getInitialData } from "./action/initialData";
import RouteList from "./config/routesConfig";
import { AuthContext } from "./contextAPI/AuthContext";
import { CategoryContext } from "./contextAPI/CategoryContext";
import { ProductContext } from "./contextAPI/ProductContext";
import { routes } from "./pages/routes";

function App() {
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
          <React.Suspense fallback={"Loading..."}>
            <RouteList routes={routes} />
          </React.Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
