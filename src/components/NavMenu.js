import React, {useState} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

import './NavMenu.css';
import CartIcon from "./Cart/CartIcon";
import LoginMenu from "./Login/LoginMenu";
import {useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export const NavMenu = (props) => {
  const [collapsed,setCollapsed] = useState(false)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const role = useSelector(state => state.user.Role)
  const isAdmin = role === 'Admin'
  
  var icon = (
    <span className="logo">
        <img src="./Images/Logo/logo.png" height="120" width="160" alt="Origami Shop" />
    </span>
  );
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light  >
          <Container>
            <NavbarBrand tag={Link} to="/" >{icon}</NavbarBrand>
            <NavbarToggler onClick={()=>setCollapsed(!collapsed)} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="fa " to="/cart"><CartIcon /> <FontAwesomeIcon icon={faCartArrowDown}color=" #F5B041"/></NavLink>
                  
                </NavItem>
                <NavItem hidden={!isLoggedIn || !isAdmin }>
                  <NavLink tag={Link} className="text-dark" to="/admin-panel/account">Admin Panel</NavLink>
                </NavItem>
                <NavItem hidden={!isLoggedIn || isAdmin}>
                  <NavLink tag={Link} className="text-dark" to="/customer-profile">Profile</NavLink>
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
