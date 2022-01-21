import AdminNav from "../Cart/AdminNav";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {deleteById, endpoints, getAll} from "../../services/api";
import { Button } from "reactstrap";

const AdminOrdersTable = () => {
    const [orders,setOrders] = useState([])
    useEffect(() => {
        getAll(endpoints.orders).then(data => setOrders(data))
    },[]);

    const onHandleDelete = (Id) =>
    {
        deleteById(endpoints.orders,Id)
        .then( res => {
            console.log(res);
            let index = orders.findIndex( e => e.Id === Id)
            if (iindexd >= 0)
            {
                let newOrders = [...orders]
                newOrders.splice(index , 1,)
                setOrders(newOrders)
            }
            
        }
        )
    }
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
                    <th>Customer Id</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => <tr key={order.Id}>
                    <td>{order.Id}</td>
                    <td>{order.TotalPrice}</td>
                    <td>
                        <Link to={"/customer/"+order.CustomerId}>{order.CustomerId}</Link>
                    </td>
                    <td>{order.ShippingAddress}</td>
                    <td>{order.OrderStatus}</td>
                    <td>
                        <Button
                            onClick={() =>onHandleDelete(order.Id) }
                        >Delete</Button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default AdminOrdersTable;