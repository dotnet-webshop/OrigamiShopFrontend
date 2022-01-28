import CustomerDetails from "./CustomerDetails";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import { getOne, endpoints, updateById } from "../../services/api";
import { Button, Input, Label } from "reactstrap";

export const CustomerProfile = () => {

    const user = useSelector(state => state.user);
    const [message, setMessage] = useState();

    const [customer, setCustomer] = useState({
        Id: user.Id,
        FullName: "",
        Email: "",
        PhoneNumber: "",
        DefaultShippingAddress: "",
        BillingAddress: "",
        City: "",
        Country: "",
        ZipCode: "",
        Orders: []
    });

    useEffect(() => {
        getOne(endpoints.customers, user.Id).then(data => setCustomer({ ...data }))
    }, [])

    const onHandleSubmit = (customer) => {
        updateById(endpoints.customers, customer.Id, customer)
            .then(p => {
                if (p !== null) {
                    setCustomer({ ...p });
                    setMessage("Profile saved!");
                } else {
                    setMessage("Error saving profile!");
                }
            })
    }

    return (

        <div>
            <form>
                <div className={"card "} style={{ width: "80rem", marginRight: "1rem", }}>
                    <div className="card-header p-3 border bg-success p-2 text-dark bg-opacity-10">
                        <div className="text-center">
                            
                            <strong>{customer.FullName}</strong><small className="font-monospace text-muted">&emsp;Profile </small>
                        </div>
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
                                <strong>Billing Address:</strong>
                                <div className="row">
                                    <div className="col-lg-9">
                                        <Input name="BillingAddress" type="text"
                                            value={customer.BillingAddress}
                                            onChange={(e) => setCustomer({ ...customer, BillingAddress: e.target.value })} />
                                    </div>
                                    <div className="col-lg-3">
                                        <Button onClick={() => setCustomer({ ...customer, BillingAddress: customer.DefaultShippingAddress })}>Same as shipping address</Button>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <strong>Zipcode:</strong>
                                <Input name="ZipCode" type="text"
                                    value={customer.ZipCode}
                                    onChange={(e) => setCustomer({ ...customer, ZipCode: e.target.value })} />
                            </li>
                            <li className="list-group-item">
                                <strong>City:</strong>
                                <Input name="City" type="text"
                                    value={customer.City}
                                    onChange={(e) => setCustomer({ ...customer, City: e.target.value })} />
                            </li>
                            <li className="list-group-item">
                                <strong>Country:</strong>
                                <Input name="Country" type="text"
                                    value={customer.Country}
                                    onChange={(e) => setCustomer({ ...customer, Country: e.target.value })} />
                            </li>
                        </ul>
                    </div>
                </div>
                <Button onClick={() => onHandleSubmit(customer)}>Save</Button>
                <p className="text-danger">{message}</p>
            </form>
            <br></br>
            <Orders orderList={customer.Orders} />
        </div>

    )
}