function Reciept(props) {
    const data = props.location.state.receipt
    let products = data.Products

    console.log(data)

    return(
        <div>
            <h1 className="mb-5">Reciept</h1>
            <b className="mb-3">Order nr </b> <p>{ data.Id }</p>
            <b className="mb-3">Email </b> <p>{ data.OrderEmail }</p>
            <b className="mb-3">Shipping Address </b><p> { data.ShippingAddress }</p>
            <b className="mb-5">Total cost </b><p>{data.TotalPrice}$</p>


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
    )
}
export default Reciept;