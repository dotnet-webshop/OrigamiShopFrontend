import CustomerDetails from "./CustomerDetails";
import Orders from "./Orders";
import {useSelector} from "react-redux";
import React, {Component, useEffect, useState} from "react";
import { getOne, endpoints } from "../../services/api";
import Button from 'react-bootstrap/Button'

export const CustomerProfile = () => {

    const Id = useSelector(state => state.user.Id);
    const [customer, setCustomer] = useState({
        Id,
        FullName: "",
        Email: "",
        PhoneNumber:"",
        DefaultShippingAddress:"",
        BillingAddress:"",
        Orders: []
    });

    useEffect(() => {
        getOne(endpoints.customers, Id).then(data => setCustomer({...data}))        
    }, [])

    

    return (


            <div >
                
                <CustomerDetails customer={customer} />
                <br></br>
                <Orders orderList={customer.Orders} />       
            </div>
    )
}
export default CustomerProfile;

