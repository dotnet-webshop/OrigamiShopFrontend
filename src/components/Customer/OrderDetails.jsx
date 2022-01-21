import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import { endpoints, getOne} from "../../services/api";
import axios from "axios";



function OrderDetails(props) {

    const Id = useSelector(state => state.user.Id);
    const [orderDetails, setOrderDetails] = useState({
        Id,
        OrderDate: "",
        TotalPrice: "",
        ShippingAddress:"",
        DefaultShippingAddress:"",
        OrderStatus:"",
    });
    useEffect(() => {
        getOne(endpoints.orders, Id).then(data => setOrderDetails(data))
        
    }, [])
    return (
        
        <div className={"card"} style={{ width: "45rem", marginRight: "1rem", }}>

            <div className="card-header">
                <h5 className="card-title"> <strong>Order Id: </strong>{orderDetails.Id}</h5>
            </div>
            <div className="card-body">

                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Order Date: </strong>{orderDetails.OrderDate}</li>
                    <li className="list-group-item"><strong>Total Price: </strong>{orderDetails.TotalPrice}</li>
                    <li className="list-group-item"><strong>Shipping Address: </strong>{orderDetails.ShippingAddress}</li>
                    <li className="list-group-item"><strong>Status: </strong>{orderDetails.OrderStatus}</li>
                    <li className="list-group-item"><strong>Order Date: </strong>{orderDetails.Products}</li>
                </ul>

            </div>
           
        </div>
       
    );
}

export default OrderDetails;