import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Accordion} from 'react-bootstrap';
import { endpoints, getOne} from "../../services/api";
import OrderDetails from "./OrderDetails";

function Orders({orderList}) {
    console.log(orderList);
    
    return (
        <div >
           <h4 ><small className="font-monospace text-muted"> &emsp;My Orders </small></h4>
           <br></br>
            <div className="bg-success p-2 text-dark bg-opacity-10">
                <div className="row">

                    <div className="col">Order Number</div>
                    <div className="col">Date Created</div>
                    <div className="col">Status</div>
                    <div className="col">Shipping Address</div>
                    <div className="col">Total Price</div>
                </div>
                <div >
                    {orderList.map(order => <div key={order.Id}>

                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="row" >
                                    <p className="col">
                                        {order.Id}
                                    </p>

                                    <p className="col">
                                        {new Date(order.OrderDate).toDateString()}
                                    </p>

                                    <p className="col">
                                     &nbsp;&nbsp;&nbsp;  {order.OrderStatus}
                                    </p>

                                    <p className="col">
                                     &nbsp; &nbsp;&nbsp;&nbsp; {order.ShippingAddress}
                                    </p>

                                    <p className="col">
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; ${order.TotalPrice}
                                    </p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    
                                    
                                    <h4 ><small className="font-monospace text-muted"> &emsp;Products </small></h4>
                                    
                                    <OrderDetails Items={order.Products}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>)}
                </div>
            </div>
            
          
        </div>
    );
}

export default Orders;