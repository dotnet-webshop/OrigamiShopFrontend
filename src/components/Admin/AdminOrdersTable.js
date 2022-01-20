import AdminNav from "../Cart/AdminNav";
import React, {useEffect, useState} from "react";
import {endpoints, getAll} from "../../services/api";

const AdminOrdersTable = () => {
    const [orders,setOrders] = useState([])
    useEffect(() => {
        getAll(endpoints.orders).then(data => setOrders(data))
    },[]);
    return (
        <div>
            <AdminNav currentRoute={"orders"}/>
            <h1>Admin Panel - Orders</h1>
            <p>All orders</p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Total Price</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => <tr key={order.Id}>
                    <td>{order.Id}</td>
                    <td>{order.TotalPrice}</td>
                    <td>{order.ShippingAddress}</td>
                    <td>{order.OrderStatus}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default AdminOrdersTable;