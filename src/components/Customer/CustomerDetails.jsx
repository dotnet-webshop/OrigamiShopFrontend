import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {endpoints, getOne} from "../../services/api";

function CustomerDetails(props) {
    const [customer, setCustomer] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        getOne(endpoints.customers, user.Id).then(data => setCustomer(data[user.Id]))
    }, []);

    return (
        <div>
            <div className="d-flex flex-wrap">
                {customer.map((customer) =>
                    <div className={"card"} style={{ width: "45rem", marginRight: "1rem", }}  >
                        <h4>My Profile</h4>
                    
                        <div className="card-header" key={customer.Id} customer={customer}>
                            <h5 className="card-title"> <strong>Name: </strong>{props.customer.FullName}</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Email: </strong>{props.customer.Email}</li>
                                <li className="list-group-item"><strong>Phone Number: </strong>{props.customer.PhoneNumber}</li>
                                <li className="list-group-item"><strong>Shipping Address: </strong>{props.customer.DefaultShippingAddress}</li>
                                <li className="list-group-item"><strong>Billing Address: </strong>{props.customer.BillingAddress}</li>
                            </ul>
                        </div>
                    </div>
                )}
                     
            </div>

       
        </div>
        
    );
}
export default CustomerDetails;
