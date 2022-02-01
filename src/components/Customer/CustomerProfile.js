import CustomerDetails from "./CustomerDetails";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import React, { Component, useEffect, useState } from "react";
import { getOne, endpoints, updateById } from "../../services/api";
import Form from 'react-bootstrap/Form'
import {Button, Input, Label, Col} from "reactstrap";

export const CustomerProfile = () => {

    const user = useSelector(state => state.user);
    const [message, setMessage] = useState();
    const [validated, setValidated] = useState(false);

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

    const onHandleSubmit = (event) => {
        setValidated(true);
        const form = event.currentTarget;
        console.log(form.checkValidity())
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }
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
            <Form noValidate validated={validated} onSubmit={onHandleSubmit}>
                <div className={"card "} style={{ width: "80rem", marginRight: "1rem", }}>
                    <div className="card-header p-3 border bg-success p-2 text-dark bg-opacity-10">
                        <div className="text-center">
                            
                            <strong>{customer.FullName}</strong><small className="font-monospace text-muted">&emsp;Profile </small>
                        </div>
                    </div>
                    <div className="card-body">
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <Form.Group as={Col}  controlId="editCustomerValidation" >
                                <Form.Label><strong>Full Name</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={customer.FullName} name="fullName" 
                                    onChange={(event)=>setCustomer({...customer,FullName: event.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">Full name is required</Form.Control.Feedback>
                                </Form.Group>
                            </li>
                            <li className="list-group-item">
                            <Form.Group as={Col}  controlId="editCustomerValidation">
                            <Form.Label><strong>Email</strong></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={customer.Email} name="Email" 
                                onChange={(event)=>setCustomer({...customer,Email: event.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                            </Form.Group>
                            </li>
                            <li className="list-group-item">
                                <Form.Group as={Col}  controlId="editCustomerValidation">
                                <Form.Label><strong>Phone number</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={customer.PhoneNumber} name="PhoneNumber" 
                                    onChange={(event)=>setCustomer({...customer,PhoneNumber: event.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">Phone number is required</Form.Control.Feedback>
                                </Form.Group>
                            </li>
                            <li className="list-group-item">
                                <Form.Group as={Col}  controlId="editCustomerValidation">
                                <Form.Label><strong>Shipping Address</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={customer.DefaultShippingAddress} name="ShippingAddress" 
                                    onChange={(event)=>setCustomer({...customer,DefaultShippingAddress: event.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">Shipping address is required</Form.Control.Feedback>
                                </Form.Group>
                            </li>
                            <li className="list-group-item">
                                <div className="row">

                                        <Form.Group as={Col}  controlId="editCustomerValidation">
                                        <Form.Label><strong>Billing Address</strong></Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={customer.BillingAddress} name="BillingAddress" 
                                            onChange={(event)=>setCustomer({...customer,BillingAddress: event.target.value})}/>
                                            

                                        <Button onClick={() => setCustomer({ ...customer, BillingAddress: customer.DefaultShippingAddress })}>Same as shipping address</Button>

                                        <Form.Control.Feedback type="invalid">Billing Address</Form.Control.Feedback>
                                    </Form.Group>
                                    </div>
                            </li>
                            <li className="list-group-item">
                            <Form.Group as={Col}  controlId="ZipCode">
                            <Form.Label><strong>Zipcode</strong></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={customer.ZipCode} name="ZipCode" 
                                onChange={(event)=>setCustomer({...customer,ZipCode: event.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">ZipCode is required</Form.Control.Feedback>
                            </Form.Group>
                            </li>
                            <li className="list-group-item">
                            <Form.Group as={Col}  controlId="editCustomerValidation">
                            <Form.Label><strong>City</strong></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={customer.City} name="City" 
                                onChange={(event)=>setCustomer({...customer,City: event.target.value})}
                            />
                            <Form.Control.Feedback type="invalid">City is required</Form.Control.Feedback>
                            </Form.Group>
                            </li>
                            <li className="list-group-item">
                            <Form.Group as={Col}  controlId="editCustomerValidation">
                                <Form.Label><strong>Country</strong></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={customer.Country} name="Country" 
                                    onChange={(event)=>setCustomer({...customer,Country: event.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">Country is required</Form.Control.Feedback>
                                </Form.Group>
                            </li>
                        </ul>
                    </div>
                </div>
                <Button type="submit" >Save</Button>
                <p className="text-success">{message}</p>
            </Form>
            <br></br>
            <Orders orderList={customer.Orders} />
        </div>

    )
}