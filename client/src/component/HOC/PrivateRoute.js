import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = localStorage.getItem('a_token');
                return token ? <Component {...props} /> : <Redirect to={"/admin/login"} />
            }}
        />
    )
}

export default PrivateRoute;