const Reciept = ({location}) => {
    const order = location.state.order
    return(
        <div>
            <h1 className="mb-5">Reciept</h1>
            <b className="mb-3">#Order nr </b> <p>{ order.Id }</p>
            <b className="mb-3">Email </b> <p>{ order.OrderEmail }</p>
            <b className="mb-3">Shipping Address </b><p> { order.ShippingAddress }</p>
            <b className="mb-5">Total cost </b><p>{order.TotalPrice}$</p>


            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Product Id</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.Products.map(item => {
                            return<tr>
                                    <td>{item.Product.Id }</td>
                                    <td>{ item.Product.ProductName }</td>
                                    <td>{ item.Quantity }</td>
                                    <td>{item.Quantity * item.Product.ProductPrice }$</td>
                                </tr>
                        })
                    }
                    <tr><td colSpan={3}>
                            <b>Total Price</b>
                        </td>
                        <td>
                            <b>{order.TotalPrice}$</b>
                        </td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Reciept;