import AdminNav from "../Cart/AdminNav";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteById, endpoints, getAll } from "../../services/api";
import { Accordion } from 'react-bootstrap';
import {Button} from 'reactstrap';
const AdminOrdersTable = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getAll(endpoints.orders).then(data => setOrders(data))
    }, []);

    const onHandleDelete = (Id) => {
        deleteById(endpoints.orders, Id)
            .then(res => {
                console.log(res);
                let index = orders.findIndex(e => e.Id === Id)
                if (index >= 0) {
                    let newOrders = [...orders]
                    newOrders.splice(index, 1,)
                    setOrders(newOrders)
                }
            }
            )
    }
    return (
        <div>
            <AdminNav currentRoute={"orders"} />
            <h1>Admin Panel - Orders</h1>
            <p>All orders</p>
            <div className="">
                <div className="row">
                    <div className="col">
                        <b>Order Id</b>
                    </div>
                    <div className="col">
                        <b>Customer Id</b>
                    </div>
                    <div className="col">
                        <b>Date Created</b>
                    </div>
                    <div className="col">
                        <b>
                            Total Price
                        </b>
                    </div>
                    <div className="col">
                        <b>
                            Status
                        </b>
                    </div>
                </div>
                <div>
                    {orders.map(order => <div key={order.Id}>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="row">
                                    <p className="col">
                                        {order.Id}
                                    </p>
                                    <p className="col">

                                        {order.CustomerId}
                                    </p>
                                    <p className="col">
                                        {new Date(order.OrderDate).toDateString()}
                                    </p>

                                    <p className="col">
                                        ${order.TotalPrice}
                                    </p>

                                    <p className="col">

                                        {order.OrderStatus}
                                    </p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Link to={`/orders/${order.Id}`}>
                                        <Button outline color="primary" className="my-2">
                                            Edit Order
                                        </Button>
                                    </Link>
                                    <p>
                                        <b>Total Price </b>
                                        ${order.TotalPrice}
                                    </p>
                                    <p>
                                        <b>Customer </b>
                                        {order.CustomerId}
                                    </p>

                                    <p>
                                        <b> Products</b>
                                    </p>
                                    <table className="table table-striped" >
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Price
                                                </th>
                                                <th>
                                                    Quantity
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.Products.map(item =>

                                                <tr key={item.ProductId}>
                                                    <td>
                                                        {item.Product.ProductName}
                                                    </td>
                                                    <td>
                                                        {item.Product.ProductPrice}
                                                    </td>
                                                    <td>
                                                        {item.Quantity}
                                                    </td>
                                                </tr>

                                            )}
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>)}
                </div>
            </div>
        </div>
    )
}
export default AdminOrdersTable;