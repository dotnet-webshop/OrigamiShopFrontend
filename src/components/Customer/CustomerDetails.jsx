
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {endpoints, getOne} from "../../services/api";
import Orders from "./OrderDetails";
import axios from "axios";


function CustomerDetails(props) {
    
    const Id = useSelector(state => state.user.Id);
    const [customer, setCustomer] = useState({
        Id,
        FullName: "",
        Email: "",
        PhoneNumber:"",
        DefaultShippingAddress:"",
        BillingAddress:"",
    });
    useEffect(() => {
        getOne(endpoints.customers, Id).then(data => setCustomer(data))
        
    }, [])
   
    
    return (
        <div>
            
            <div className={"card"} style={{ width: "45rem", marginRight: "1rem", }}>
            
                <div className="card-header">
                    <h5 className="card-title"> <strong>Full Name: </strong>{customer.FullName}</h5>
                </div>
                <div className="card-body">
                    
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Email: </strong>{customer.Email}</li>
                        <li className="list-group-item"><strong>Phone Number: </strong>{customer.PhoneNumber}</li>
                        <li className="list-group-item"><strong>Shipping Address: </strong>{customer.DefaultShippingAddress}</li>
                        <li className="list-group-item"><strong>Billing Address: </strong>{customer.BillingAddress}</li>
                    </ul>

                </div>
            
            </div>

        </div>
       
    );
}
export default CustomerDetails;

