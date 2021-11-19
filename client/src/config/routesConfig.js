import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import PrivateAdminRoute from '../component/HOC/PrivateAdminRoute';
import PrivateRoute from '../component/HOC/PrivateRoute';

const RouteList = (props) => {
    return (
        <Fragment>
            {props.routes.map(({ component: Component, path, isPrivate, isPrivateAdmin, ...rest }) => {
                if (isPrivateAdmin)
                    return (
                        <PrivateAdminRoute key={path}
                            component={Component}
                            path={path}
                            {...rest}
                        />
                    )
                else if (isPrivate) {
                    return (
                        <PrivateRoute key={path}
                            component={Component}
                            path={path}
                            {...rest}
                        />
                    )
                }
                else
                    return (
                        <Route key={path}
                            component={Component}
                            path={path}
                            {...rest}
                        />
                    )
                {/* <Fragment key={path}>
                        {isPrivate ? (
                            <PrivateRoute
                                component={Component}
                                path={path}
                                {...rest}
                            />
                        ) : (
                            <Route
                                component={Component}
                                path={path}
                                {...rest}
                            />
                        )}
                    </Fragment> */}
            })
            }
        </Fragment>
    )
};

export default RouteList;