// details about an order and the option for a admin to edit that order

import { useEffect, useState } from "react"
import { endpoints, getAll, getOne } from "../../services/api"
import { Button, Input } from "reactstrap"

const OrderDetailsPage = ({ match }) => {

    const [products,setProducts] = useState([])

    const [customer, setCustomer] = useState({
        Id: "",
        FullName: "",
        Email: "",
        PhoneNumber: ""
    })

    const [order, setOrder] = useState({
        Id: 0,
        OrderDate: "",
        OrderStatus: "",
        CustomerId: "",
        ProductImageUrl: "",
        OrderAddress: "",
        OrderEmail: "",
        ShippingAddress: "",
        Products: [],
        TotalPrice: 0
    })

    const [showModal, setShowModal] = useState(false)

    const onHandleDelete = () => {
        setShowModal(true)
    }

    const save = () => {

    }

    useEffect(() => {
        getOne(endpoints.orders, match.params.orderId)
            .then(p => {
                if (p !== null) {
                    setOrder({ ...p })
                    getAll(endpoints.products)
                    .then(data => setProducts(data))

                    getOne(endpoints.customers, order.CustomerId)
                        .then(data => setCustomer(data))
                }
            })
    }, [match])

    return (
        <section>
            <header className="row">
                <h2 className="col-sm-8">
                    Order #{order.Id}
                </h2>

                <div className="col">
                    <Button outline color="danger" onClick={() => onHandleDelete()} >Delete Order</Button>
                </div>

                <div className="col">
                    <div>

                        <Button outline color="primary" className="mr-5" onClick={() => save()} >Save Edits</Button>
                    </div>
                </div>
            </header>
            <h4 className="mt-5">Details</h4>
            <hr></hr>
            <div>

                <div className="row mt-5">
                    <p className="col">
                        <b> Order Id: </b>
                        {order.Id}
                    </p>
                    <p className="col">
                    </p>
                    <p className="col">
                        <b> Order Date: </b>
                        {new Date(order.OrderDate).toDateString()}
                    </p>
                </div>
                <div className="row mt-5">
                    <p className="col">
                        <b> Order Status: </b>
                        {order.OrderStatus}
                    </p>
                    <p className="col">
                        <b> Order Total Price:  </b>
                        ${order.TotalPrice}
                    </p>
                    <p className="col">
                        <b> ShippingAddress: </b>
                        {order.ShippingAddress}
                    </p>
                </div>
            </div>
            <hr></hr>
            <div>
                <h4>Customer</h4>
                <div className="row mt-5">
                    <p className="col">
                        <b> Customer Name: </b>
                        {customer.FullName}
                    </p>

                    <p className="col">
                        <b> Email: </b>
                        {customer.Email}
                    </p>
                </div>
            </div>
            <hr></hr>
            <h4>Products</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                    <tbody>
                        {order.Products.map(item =>
                            <tr key={item.ProductId}>
                                <td>
                                    <Input type="select">
                                        { products.map(product => 
                                            <option value={product.Id} key={product.Id} >
                                                {product.ProductName}
                                            </option>
                                        )
                                        }
                                    </Input>
                                </td>
                                <td>
                                    <img src={item.Product.ProductImageUrl} style={{maxWidth:"100px"}}/>
                                </td>
                                <td>
                                    {item.Product.ProductPrice}
                                </td>
                                <td>
                                    {item.Quantity}
                                </td>
                            </tr>
                        )}
                    </tbody>
            </table>
        </section>
    )
}
export default OrderDetailsPage;