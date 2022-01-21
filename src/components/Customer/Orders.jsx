import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
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
                </tr>
                </thead>
                <tbody>
                {orderList.map(order => <tr key={order.Id}>
                    <td>{order.Id}</td>
                    <td>{order.TotalPrice}</td>
                    <td>{order.ShippingAddress}</td>
                    <td>{order.OrderStatus}</td>
                    <td>
                       <OrderDetails Items={order.Products}/>

                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
           
       
    );
}

export default Orders;