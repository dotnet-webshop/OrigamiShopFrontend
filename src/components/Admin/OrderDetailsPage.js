// details about an order and the option for a admin to edit that order

import { useEffect, useState } from "react"
import { endpoints, updateById, getAll, getOne, deleteById } from "../../services/api"
import { Button, Input } from "reactstrap"
import { Redirect, useHistory } from "react-router-dom"

const OrderDetailsPage = ({ match }) => {

    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const history = useHistory();
    const statuses = [
        "Processing",
        "Cancelled",
        "Deliverd",
        "PickupAvailable"
    ]
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

    const [newItem, setNewItem] = useState({
        ProductId: 1,
        Product: {},
        Quantity: 1
    });

    const onAddNewItem = () => {
        if (order.Products.includes(i => i.ProductId === newItem.ProductId)){
            return;
        }
        setOrder({ ...order, Products: [...order.Products, newItem] })
        setNewItem({})
    }
    const onHandleDelete = () => {
        deleteById(endpoints.orders, order.Id)
            .then(res => {
                history.goBack();
            })
    }

    const save = () => {
        let payload = { ...order, Products: [...order.Products] }

        updateById(
            endpoints.orders,
            order.Id,
            payload
        ).then(
            data => setOrder({ ...data })
        )
    }

    const setItemQuantity = (index, amount) => {
        let updatedItems = [...order.Products]
        updatedItems[index] = { ...updatedItems[index], Quantity: amount }
        setOrder({ ...order, Products: updatedItems })
    }

    const onHandleSelectItem = (id, index) => {
        const product = products.find(p => p.Id === parseInt(id))
        if (product !== undefined) {
            let newProducts = [...order.Products]
            newProducts[index] = { ...newProducts[index], Product: {...product}, ProductId: product.Id , Quantity: product.Quantity }
            setOrder({ ...order, Products: newProducts })
        }
    }

    const productOptions = () => {
        return products.map((p,i) =>
                <option value={p.Id} key={p.Id + " " + i} >
                    {p.ProductName}
                </option>
            )
    }
    
    const removeOrderItem = (index) => {
        if (index > -1)
        {
            let items = [...order.Products]
            items.splice(index,1)
            setOrder({...order,Products: items})
        }
    }
    const onSelectCustomer = (id) => {
        const c = customers.find(e => e.Id === id)
        if (c !== undefined) {
            setOrder({ ...order, CustomerId: c.Id })
        }
    }
    useEffect(() => {
        getOne(endpoints.orders, match.params.orderId)
            .then(o => {
                if (o !== null) {
                    setOrder(o)
                    getAll(endpoints.products)
                        .then(data => setProducts(data))

                    getAll(endpoints.customers)
                        .then(data => {
                            setCustomers(data)
                            onSelectCustomer(order.CustomerId)
                        })
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
                        <b> Order Total Price:  </b>
                        ${order.TotalPrice}
                    </p>
                    <p className="col">
                        <b> Order Date: </b>
                        <Input type="date" defaultValue={order.OrderDate.substring(0,10)}
                        onChange={(e)=> setOrder({...order,OrderDate:e.target.valueAsDate.toISOString()})}></Input>
                    </p>
                </div>
                <div className="row mt-5">
                    <p className="col">
                        <b> Order Status: </b>
                        <Input type="select" value={order.OrderStatus}
                            onChange={(e) => setOrder({ ...order, OrderStatus: e.target.value })}>
                            {
                                statuses.map(status =>
                                    <option value={status} key={status}>
                                        {status}
                                    </option>)
                            }
                        </Input>

                    </p>

                    <p className="col">
                        <b> ShippingAddress: </b>
                        <Input type="text" placeholder="Address" value={order.ShippingAddress}
                            onChange={(e) => setOrder({ ...order, ShippingAddress: e.target.value })} />
                    </p>
                </div>
            </div>
            <hr></hr>
            <div>
                <h4>Customer</h4>
                <div className="row mt-5">
                    <Input type="select" value={order.CustomerId} onChange={(e) => onSelectCustomer(e.target.value)} >
                        {
                            customers.map(c =>
                                <option value={c.Id} key={c.Id}>
                                    {c.Email}
                                </option>)
                        }
                    </Input>
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

                    <tr className="my-5">
                        <td>
                            <Input type="select"
                            onChange={(e) => setNewItem({...newItem, Product: products.find( p => p.Id === parseInt(e.target.value))})} >
                                {products.map(p =>
                                    <option value={p.Id} key={p.Id} >
                                        {p.ProductName}
                                    </option>
                                )
                                }
                            </Input>
                        </td>
                        <td>
                            <img src={newItem.Product?.ProductImageUrl} style={{ maxWidth: "100px" }} />
                        </td>
                        <td>
                            {newItem.Product?.ProductPrice}
                        </td>
                        <td>
                            <Input type="number"
                                min={1} max={newItem.Product?.Stock}
                                defaultValue={newItem.Quantity}
                                onChange={(e) => setNewItem({ ...newItem, Quantity: e.target.valueAsNumber })} />
                        </td>
                        <td>
                            <Button onClick={()=>onAddNewItem()} color="primary" outline >+ Add Item</Button>
                        </td>
                    </tr>
                    {order.Products.map((item, index) =>
                        <tr key={item.ProductId + "-" + index}>
                            <td>
                                <Input value={item.ProductId} type="select" onChange={(e) => onHandleSelectItem(e.target.value, index)}>
                                    {productOptions()}
                                </Input>
                            </td>
                            <td>
                                <img src={item?.Product?.ProductImageUrl} style={{ maxWidth: "100px" }} />
                            </td>
                            <td>
                                {item?.Product?.ProductPrice}
                            </td>
                            <td>
                                <Input type="number"
                                    min={1} max={item?.Product?.Stock}
                                    defaultValue={item.Quantity ?? 1}
                                    onChange={(e) => setItemQuantity(index, e.target.valueAsNumber)} />
                            </td>
                            <td>
                                <Button onClick={() => removeOrderItem(index)} outline color="danger">- Remove</Button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </section>
    )
}
export default OrderDetailsPage;