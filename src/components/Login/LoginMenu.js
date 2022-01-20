import {Link} from "react-router-dom";
import React from "react"
import {userActions} from '../../state/actions/index'
import {bindActionCreators} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {onLogOut} from "../../state/actions/userActions";
import {NavItem, NavLink} from "reactstrap";

function LoginMenu(){
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {onLogOut} = bindActionCreators(userActions,dispatch)


    const loginItem  = () => (
        <NavItem>
            <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
        </NavItem>
    )
    const logOutItem = () => (
        <NavItem>
            <NavLink tag={Link} to="/" className="text-dark" onClick={() => onLogOut()}> Log Out</NavLink>
        </NavItem>
    )
    return (
        user.isLoggedIn ? logOutItem() : loginItem()
    )
}
export default LoginMenu;