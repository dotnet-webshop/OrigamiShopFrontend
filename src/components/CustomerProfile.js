import React, {Component} from 'react';
import CustomerDetails from "./Customer/CustomerDetails";
import Orders from "./Customer/Orders";
import OrderDetails from "./Customer/OrderDetails";


export class CustomerProfile extends Component {
    static displayName = CustomerProfile.name;

    render() {
       
        return (
            <div >

                <CustomerDetails  />
                <Orders  />
                <OrderDetails  />
                  
            </div>
        );
    }  
}


