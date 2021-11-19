import { Redirect, Route } from "react-router-dom";

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = localStorage.getItem('token');
                return token ? <Component {...props} /> : <Redirect to={"/login"} />
            }}
        />
    )
}

export default PrivateAdminRoute;