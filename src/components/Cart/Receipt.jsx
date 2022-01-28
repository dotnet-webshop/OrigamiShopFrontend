function Reciept(props) {
    const data = props.location.state.receipt
    let products = data.Products

    console.log(data)

    return(
        <div>
            <h2 className="mb-3"><small className="font-monospace text-muted">Receipt </small></h2>
            <div className="p-3 border bg-light p-2 text-dark " >
                <div className="row g-3">
                    <div className="col-md-4">
                        <b className="mb-3">Order nr </b> <p>{ data.Id }</p>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-4">
                        <b className="mb-3">Email </b> <p>{ data.OrderEmail }</p>
                    </div>
                    <div className="col-md-4">
                        <b className="mb-3">Shipping Address </b><p> { data.ShippingAddress }</p>
                    </div>
                    <div className="col-md-4">
                        <b className="mb-5">Total cost </b><p>{data.TotalPrice}$</p>
                    </div>
                </div>
            </div>
            <br />
            <h4 className="mb-3"><small className="font-monospace text-muted">Details - </small></h4>
            <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product number</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.Products.map(order => {
                                console.log(order);
                                return<tr>
                                        <td>{ order.Product.Id }</td>
                                        <td>{ order.Product.ProductName }</td>
                                        <td>{ order.Quantity }</td>
                                        <td>{order.Quantity * order.Product.ProductPrice }$</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
           
        </div>
    )
}
export default Reciept;