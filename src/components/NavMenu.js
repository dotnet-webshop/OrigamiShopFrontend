import React, {useState} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

import './NavMenu.css';
import CartIcon from "./Cart/CartIcon";
import LoginMenu from "./Login/LoginMenu";
import {useSelector} from "react-redux";


export const NavMenu = (props) => {
  const [collapsed,setCollapsed] = useState(false)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const role = useSelector(state => state.user.Role)
  const isAdmin = role === 'Admin'
  
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">OrigamI Shop</NavbarBrand>
            <NavbarToggler onClick={()=>setCollapsed(!collapsed)} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/cart"><span>Cart</span> <CartIcon/></NavLink>
                </NavItem>
                <NavItem hidden={!isLoggedIn || !isAdmin }>
                  <NavLink tag={Link} className="text-dark" to="/admin-panel/account">Admin Panel</NavLink>
                </NavItem>
                <NavItem hidden={!isLoggedIn || isAdmin}>
                  <NavLink tag={Link} className="text-dark" to="/customer-profile">My Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/about">About Us</NavLink>
                </NavItem>
                <LoginMenu/>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
}

export default NavMenu
