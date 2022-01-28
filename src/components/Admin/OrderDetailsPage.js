// details about an order and the option for a admin to edit that order

import { useEffect, useState } from "react"
import { endpoints, updateById, getAll, getOne, deleteById } from "../../services/api"
import { Button, Input, Row, Table } from "reactstrap"
import { Redirect, useHistory } from "react-router-dom"
import { Col, Form } from "react-bootstrap"

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

    const initalItem = {
        ProductId: 1,
        Product: {},
        Quantity: 1
    }

    const [newItem, setNewItem] = useState(initalItem);

    const onAddNewItem = () => {
        if (order.Products.includes(i => i.ProductId === newItem.ProductId)) {
            return;
        }
        setOrder({ ...order, Products: [...order.Products, newItem] })
        setNewItem(initalItem)
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
        const prevQuantity = products[index].Quantity
        const product = products.find(p => p.Id === parseInt(id))
        if (product !== undefined) {
            let newProducts = [...order.Products]
            newProducts[index] = { ...newProducts[index], Product: { ...product }, ProductId: product.Id, Quantity: prevQuantity }
            setOrder({ ...order, Products: newProducts })
        }
    }

    const productOptions = () => {
        return products.map((p, i) =>
            <option value={p.Id} key={p.Id + " " + i} >
                {p.ProductName}
            </option>
        )
    }

    const removeOrderItem = (index) => {
        if (index > -1) {
            let items = [...order.Products]
            items.splice(index, 1)
            setOrder({ ...order, Products: items })
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
                    Edit Order #{order.Id}
                </h2>
            </header>
            <OrderEditForm order={order} customers={customers} products={products} />
        </section>
    )
}
export default OrderDetailsPage;
// bootstrap form
const OrderEditForm = ({ order, customers, products }) => {

    useEffect(() => {
        let date = Date.parse(order.OrderDate)
        if (isNaN(date)) date = Date.now();
        setEditedOrder({ ...order, OrderDate: new Date(date).toISOString() })
    }, [order])
    const Statuses = [
        "Processing",
        "Ready to pickup",
        "Delivered",
        "Order Cancelled"
    ]
    const [validated, setValidated] = useState(false)
    const initalOrder = {
        Id: 1,
        OrderDate: "",
        OrderStatus: "",
        CustomerId: "",
        ProductImageUrl: "",
        OrderAddress: "",
        OrderEmail: "",
        ShippingAddress: "",
        Products: [],
        TotalPrice: 0
    }
    const [editedOrder, setEditedOrder] = useState(initalOrder)
    return (
        <Form noValidate validated={validated}>
            <Row className="my-4">
                <Form.Group as={Col} md={5}>
                    <Form.Label>
                        Order Status
                    </Form.Label>
                    <Form.Select
                        required
                        type="select"
                        onChange={e => setEditedOrder({ ...editedOrder, OrderStatus: e.target.value })}>
                        {Statuses.map((status, index) =>
                            <option value={status} key={index}>
                                {status}
                            </option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>
                        Order Date
                    </Form.Label>
                    <Form.Control
                        required
                        type="date"
                        value={editedOrder.OrderDate.substring(0, 10)}
                        onChange={e => setEditedOrder({ ...editedOrder, OrderDate: e.target.value })} />
                </Form.Group>

            </Row>
            <Row>
                <Form.Group as={Col} md={5}>
                    <Form.Label>
                        Shipping Address
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={editedOrder.ShippingAddress}
                        onChange={e => setEditedOrder({ ...editedOrder, ShippingAddress: e.target.value })} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>
                        Order Email
                    </Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={editedOrder.OrderEmail}
                        onChange={e => setEditedOrder({ ...editedOrder, OrderEmail: e.target.value })} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>
                        Customer
                    </Form.Label>
                    <Form.Select
                        required
                        type="text"
                        value={editedOrder.CustomerId}
                        onChange={e => setEditedOrder({ ...editedOrder, CustomerId: e.target.value })}>
                        {customers && customers.map(c =>
                            <option value={c.Id} key={c.Id}>
                                {c.FullName}
                            </option>
                        )}
                    </Form.Select>
                </Form.Group>
            </Row>
            <br />
            <Row>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th></th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        { order.Products && order.Products.map((item, index) =>
                            <tr key={item.ProductId}>
                            <td colSpan={2}>
                                <div className="d-flex">
                                <div className="">
                                    {item.Product.ProductName}
                                </div>
                                <div>
                                    <img src={item.Product.ProductImageUrl} alt={item.Product.ProductName} style={{maxHeight:"50px", marginLeft:"2em"}} />
                                </div>
                                </div>
                            
                            </td>
                            <td>{item.Product.ProductPrice}</td>
                            <td>{item.Quantity}
                                <EditableCartItem item={item}/>
                            </td>
                            
                        </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </Form>
    )
}

const EditableCartItem = ({item}) => {
    return (
          <Form.Control type="number" value={item.Quantity}/>  
    )
}