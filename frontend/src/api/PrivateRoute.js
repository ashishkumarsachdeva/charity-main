import React from 'react'
import {  Route, useNavigate } from 'react-router';
import { isAuthenticate } from './auth';

function PrivateRoute({ component, path, children, ...rest }) {
    const navigate = useNavigate();
    if (isAuthenticate()) {
        return <Route path={path} exact component={component} />;
    } else {
        return (
            <navigate
                to={{
                    pathname: "/login",
                }}
            />
        );
    }
}

export default PrivateRoute;