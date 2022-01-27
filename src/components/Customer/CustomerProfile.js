import CustomerDetails from "./CustomerDetails";
import Orders from "./Orders";
import {useSelector} from "react-redux";
import React, {Component, useEffect, useState} from "react";
import { getOne, endpoints, updateById } from "../../services/api";
import { Button, Input, Label } from "reactstrap";

export const CustomerProfile = () => {

    const user = useSelector(state => state.user);
    const [customer, setCustomer] = useState({
        Id: user.Id,
        FullName: "",
        Email: "",
        PhoneNumber:"",
        DefaultShippingAddress:"",
        BillingAddress:"",
        Orders: []
    });

    useEffect(() => {
        getOne(endpoints.customers, user.Id).then(data => setCustomer({...data}))
    }, [])

    const onHandleSubmit = (customer) => {
        updateById(endpoints.customers, customer.Id, customer)
            .then(p => {
                if (p !== null) {
                    setCustomer({ ...p });
                }
            })
    }

    return (
            <div>
                <form>
                    <div className={"card "} style={{ width: "80rem", marginRight: "1rem", }}>
                        <div className="card-header">
                            <h5 className="card-title"> <strong>{customer.FullName}</strong>
                                <small className="text-muted">  Info</small></h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Name:</strong>
                                    <Input name="FullName" type="text"
                                        value={customer.FullName}
                                        onChange={(e) => setCustomer({ ...customer, FullName: e.target.value })} />
                                </li>
                                <li className="list-group-item">
                                    <strong>Email:</strong>
                                    <Input name="Email" type="email"
                                        value={customer.Email}
                                        onChange={(e) => setCustomer({ ...customer, Email: e.target.value })} />
                                </li>
                                <li className="list-group-item">
                                    <strong>Phone Number:</strong>
                                    <Input name="PhoneNumber" type="tel"
                                        value={customer.PhoneNumber}
                                        onChange={(e) => setCustomer({ ...customer, PhoneNumber: e.target.value })} />
                                </li>
                                <li className="list-group-item">
                                    <strong>Shipping Address: </strong>
                                    <Input name="DefaultShippingAddress" type="text"
                                        value={customer.DefaultShippingAddress}
                                        onChange={(e) => setCustomer({ ...customer, DefaultShippingAddress: e.target.value })} />
                                </li>
                                <li className="list-group-item">
                                    <strong>Billing Address: </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Button onClick={() => onHandleSubmit(customer)}>Save</Button>
                </form>
                <br></br>
                <Orders orderList={customer.Orders} />       
            </div>
    )
}