import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({component:Component,adminRoute:isAdminRoute,...rest}) => {
    const user = useSelector(state => state.user)
    const redirectResult = <Redirect to={{path:"/login",state:{from:rest.location}}}/>
    const isRoleAdmin = user.Role === 'Admin';
    return(
        <Route {...rest} render={(props) => {
            if (isRoleAdmin !== true && isAdminRoute === true) return redirectResult
            if(!user.isLoggedIn) return redirectResult;
            if(user.isLoggedIn) return <Component {...props}/>;
            return redirectResult;
        }} />
    )
}

export default ProtectedRoute;