import React, {useEffect} from 'react'
import Customer from "./Customer";


function CustomerList(props) {
    const [customers, setCustomers] = React.useState([]);
    useEffect(() => setCustomers(props.customers), [props])
    return (
        <div>
            <h4>My Profile </h4>
            <section className="d-flex flex-wrap">
                {customers.map((customer) =>
                    <Customer key={customer.FullName} customer={customer}>

                    </Customer>
                )}
            </section>
        </div>
    );
}
export default CustomerList;

