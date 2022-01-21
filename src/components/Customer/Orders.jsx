import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import { endpoints, getOne} from "../../services/api";

function Orders(props) {

    const Id = useSelector(state => state.user.Id);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOne(endpoints.orders, Id).then(data => setOrderDetails(data))
        
    }, [])
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
                {orders.map(order => <tr key={order.Id}>
                    <td>{order.Id}</td>
                    <td>{order.TotalPrice}</td>
                    <td>{order.ShippingAddress}</td>
                    <td>{order.OrderStatus}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
           
       
    );
}

export default Orders;