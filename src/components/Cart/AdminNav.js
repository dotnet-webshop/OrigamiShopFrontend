import {Link} from "react-router-dom";
import React from "react";

const AdminNav = ({currentRoute}) => {
    console.log(currentRoute)
    return (
        <nav className="mb-5">
            <ul className="nav nav-fill nav-pills list-unstyled">
                <li className="nav-item">
                    <Link className={"nav-link " + (currentRoute === 'account') ? "active" : ""} aria-current="page" to="/admin-panel/account">Account</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link " + currentRoute === 'products' ? 'active' : ''} aria-current="page" to="/admin-panel/products">Products</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link " + currentRoute === 'customers' ? 'active' : ''} aria-current="page" to="/admin-panel/customers">Customers</Link>
                </li>
                <li className="nav-item">
                    <Link className={"nav-link " + currentRoute === 'customers' ? 'orders' : ''} aria-current="page" to="/admin-panel/orders">Orders</Link>
                </li>
            </ul>
        </nav>
        )
}
export default AdminNav