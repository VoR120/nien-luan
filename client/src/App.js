import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import RouteList from "./config/routesConfig";
import AppContextProvider from './contextAPI/index';
import { routes } from "./pages/routes";
import { AuthContext } from "./contextAPI/AuthContext";
import { isAdminLogin } from "./action/authAction";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    isAdminLogin(dispatch);
    if (user.token == "") {
      return <Redirect to="/admin/login" />
    }
  }, [])

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
