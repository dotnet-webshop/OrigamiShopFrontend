



function CustomerDetails({customer}) {
    
    return (
        <div>
            
            <div className={"card "} style={{ width: "50rem", marginRight: "1rem", }}>
            
                <div className="card-header p-3 border bg-success p-2 text-dark bg-opacity-10">
                    <h5 className="card-title"> {customer.FullName}
                      <small className="text-muted"> </small></h5>
                </div>
                <div className="card-body">
                    
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Email: </strong>{customer.Email}</li>
                        <li className="list-group-item"><strong>Phone Number: </strong>{customer.PhoneNumber}</li>
                        <li className="list-group-item"><strong>Shipping Address: </strong>{customer.DefaultShippingAddress}</li>
                    </ul>  

                </div>
            
            </div>

        </div>
       
    );
}
export default CustomerDetails;

