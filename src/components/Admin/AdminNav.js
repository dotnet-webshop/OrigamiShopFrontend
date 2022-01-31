import {Link} from "react-router-dom";
import React from "react";

const AdminLink = ({ url, linkText, route, currentRoute }) => {
    var liClassName = "nav-item";
    var linkClassName = "nav-link";

    if (currentRoute === route)
    {
        liClassName += " bg-secondary";
        linkClassName += " text-white";
    }

    return (
        <li className={liClassName}>
            <Link className={linkClassName} aria-current="page" to={url}>{linkText}</Link>
        </li>
        )
}

const AdminNav = ({ currentRoute }) => {
    console.log(currentRoute)
    return (
        <nav className="mb-5">
            <ul className="nav nav-fill nav-pills list-unstyled">
                <AdminLink url="/admin-panel/account" linkText="Account" route="account" currentRoute={currentRoute} />
                <AdminLink url="/admin-panel/products" linkText="Products" route="products" currentRoute={currentRoute} />
                <AdminLink url="/admin-panel/customers" linkText="Customers" route="customers" currentRoute={currentRoute} />
                <AdminLink url="/admin-panel/orders" linkText="Orders" route="orders" currentRoute={currentRoute} />
            </ul>
        </nav>
    )
}

export default AdminNav