import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Accordion} from 'react-bootstrap';
import { endpoints, getOne} from "../../services/api";
import OrderDetails from "./OrderDetails";

function Orders({orderList}) {
    console.log(orderList);
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Orders
                    </Accordion.Header>
                    <Accordion.Body >
                        {orderList.map(order => 
                            <ul className="list-group list-group-flush" key={order.Id}>
                                <li className="list-group-item">Order Id: {order.Id}</li>
                                <li className="list-group-item">Total Price: {order.TotalPrice}</li>
                                <li className="list-group-item">Shipping Address: {order.ShippingAddress}</li>
                                <li className="list-group-item">Status: {order.OrderStatus}</li>
                                <li>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Products</Accordion.Header>
                                            <Accordion.Body>
                                                <OrderDetails Items={order.Products}/>
                                            </Accordion.Body>
                                    </Accordion.Item>
                                </li>
                            </ul> 
                        )} 
                    </Accordion.Body>
                </Accordion.Item>
                
            </Accordion>
            
        </div>
    );
}

export default Orders;