import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Accordion} from 'react-bootstrap';
import { endpoints, getOne} from "../../services/api";
import OrderDetails from "./OrderDetails";

function Orders({orderList}) {
    console.log(orderList);
    
    


    return (
        <div >
           <p> Orders</p>
            <div className="">
                <div className="row">

                        <div className="col">Order Number</div>
                        <div className="col">Date Created</div>
                        <div className="col">Total Price</div>
                        <div className="col">Status</div>
                </div>
                <div>
                    {orderList.map(order => <div key={order.Id}>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="row">
                                    <p className="col">
                                        {order.Id}
                                    </p>

                                    <p className="col">
                                        {order.OrderDate}
                                    </p>

                                    <p className="col">
                                      ${order.TotalPrice}
                                    </p>

                                    <p className="col">
                                        {order.OrderStatus}
                                    </p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    
                                    <p>
                                       <b> Products</b>
                                    </p>
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