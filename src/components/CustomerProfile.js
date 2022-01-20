import React, {Component} from 'react';
import CustomerDetails from "./Customer/CustomerDetails";


export class CustomerProfile extends Component {
    static displayName = CustomerProfile.name;

    render() {
        let customerP = [
            {
                
                FullName: "TestCustomer 1",
                Email: "customer1@test.com",
                PhoneNumber: "1298304875",
                BillingAddress: "test billing Address 1",
                DefaultShippingAddress: "test shipping Address 1",
            },
            
        ];
        return (
            <div >

                <CustomerDetails customers={customerP} />
                  
            </div>
        );
    }  
}


