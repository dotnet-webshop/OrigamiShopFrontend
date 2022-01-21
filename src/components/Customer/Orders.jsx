import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Accordion} from 'react-bootstrap';
import { endpoints, getOne} from "../../services/api";
import OrderDetails from "./OrderDetails";

function Orders({orderList}) {
    console.log(orderList);
    return (
        <div>
             <h3> Orders </h3>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Total Price</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                    <th>Order Details</th>
                </tr>
                </thead>
                <tbody>
                {orderList.map(order => <tr key={order.Id}>
                    <td>{order.Id}</td>
                    <td>{order.TotalPrice}</td>
                    <td>{order.ShippingAddress}</td>
                    <td>{order.OrderStatus}</td>
                    <td>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><srtong></srtong></Accordion.Header>
                                <Accordion.Body>
                                    <OrderDetails Items={order.Products}/>
                                </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </td>
                </tr>)}
                </tbody>
            </table>
           
           
        </div>
    );
}

export default Orders;