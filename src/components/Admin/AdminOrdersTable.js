import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteById, endpoints, getAll } from "../../services/api";
import { Accordion } from 'react-bootstrap';
import {Button} from 'reactstrap';
const AdminOrdersTable = () => {
    const [orders, setOrders] = useState([])
    const [customers,setCustomers] = useState([])
    useEffect(() => {
        getAll(endpoints.customers).then(data => setCustomers(data))
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
            <h2 >Admin Panel -<small className="font-monospace text-muted"> Orders </small></h2>
            <br />
            <h4 ><small className="font-monospace text-muted"> &emsp;Orders List </small></h4>
           
            <div className="p-3 border bg-success p-2 text-dark bg-opacity-10">
                <div className="row">
                    <div className="col">
                        <b>Order Id</b>
                    </div>
                    <div className="col">
                        <b>Customer</b>
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

                                        {customers && customers.find(e => e.Id === order.CustomerId)?.FullName}
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
                                <Accordion.Body >
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
                                        {customers && customers.find(e => e.Id === order.CustomerId)?.FullName}
                                    </p>
                                    <hr/>
                                    <h4> Products</h4>
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