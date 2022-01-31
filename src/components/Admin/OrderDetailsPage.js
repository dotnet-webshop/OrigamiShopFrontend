// details about an order and the option for a admin to edit that order

import { useEffect, useState } from "react"
import { endpoints, updateById, getAll, getOne, deleteById } from "../../services/api"
import { Button, ButtonGroup, Input, Row, Table } from "react-bootstrap"
import { Redirect, useHistory } from "react-router-dom"
import { Col, Form } from "react-bootstrap"

const OrderDetailsPage = ({ match }) => {

    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const history = useHistory();

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


    const onHandleDelete = () => {
        deleteById(endpoints.orders, order.Id)
            .then(res => {
                history.goBack();
            })
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
                        })
                }
            })
    }, [match])

    return (
        <section className="p-3 border bg-success p-2 text-dark bg-opacity-10">
            <header className="row">
                <h2 className="col-sm-8">
                    Edit Order #{order.Id}
                </h2>
                <div>
                    <Button onClick={onHandleDelete} variant="danger" >Delete</Button>
                </div>

            </header>

            <OrderEditForm order={order} customers={customers} products={products} />
        </section>
    )
}
export default OrderDetailsPage;
// bootstrap form
const OrderEditForm = ({ order, customers, products }) => {
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
        TotalPrice: 0,
    }
    const initalItem = {
        ProductId: 1,
        Product:{},
        Quantity: 1
    }

    const calculateTotalPrice = () => {
        return editedOrder.Products.reduce((acc,p) => acc + p.Quantity*  p.Product.ProductPrice,0)
    }
    const [validated, setValidated] = useState(false)
    const [editedOrder, setEditedOrder] = useState({...initalOrder})
    const [newItem, setNewItem] = useState(initalItem);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (editedOrder.Products.length <= 0)
        {
            e.preventDefault();
            e.stopPropagation();
            return
        }
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          return
        }
    
        setValidated(true);
        let payload = { ...editedOrder, Products: editedOrder.Products }

        updateById(
            endpoints.orders,
            order.Id,
            payload
        ).then(
            
            data => {
                let updatedOrder = data
                updatedOrder.OrderDate = updatedOrder.OrderDate.split('T')[0];
                setEditedOrder({ ...data })
                setTimeout(() => setValidated(false) , 500)
                
            }
        )     
    }

    const setItemQuantity = (index, amount) => {
        if (isNaN(amount)) amount = 1;

        let updatedItems = [...editedOrder.Products]
        updatedItems[index] = { ...updatedItems[index], Quantity: amount }
        setEditedOrder({ ...editedOrder, Products: updatedItems })
    }

    const removeOrderItem = (index) => {
        if (index > -1) {
            let items = [...editedOrder.Products]
            items.splice(index, 1)
            setEditedOrder({ ...editedOrder, Products: items })
        }
    }

    useEffect(() => {
        let date = Date.parse(order.OrderDate)
        if (isNaN(date)) date = Date.now()
        setEditedOrder({ ...order, OrderDate: new Date(date).toISOString().split('T')[0] })
    }, [order, products])

    const onAddNewItem = () => {
        if (editedOrder.Products.findIndex(i => i.ProductId === newItem.ProductId) > -1) {
            return;
        }

        if (newItem.Product === undefined  || Object.keys(newItem.Product).length === 0) return;
        console.log(newItem.Product)
        setEditedOrder({ ...editedOrder, Products: [...editedOrder.Products, newItem] })
        setNewItem(initalItem)
    }

    const Statuses = [
        "Processing",
        "Ready to pickup",
        "Delivered",
        "Order Cancelled"
    ]

    return (
        <Form validated={validated} onSubmit={onHandleSubmit}>
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
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>
                        Order Date
                    </Form.Label>
                    <Form.Control
                        required
                        type="date"
                        value={editedOrder.OrderDate}
                        onChange={e => setEditedOrder({ ...editedOrder, OrderDate: e.target.value.split('T')[0] })} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>
                        Order Email
                    </Form.Label>
                    <Form.Control
                        required
                        type="email"
                        value={editedOrder.OrderEmail}
                        onChange={e => setEditedOrder({ ...editedOrder, OrderEmail: e.target.value })} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>
                        Customer
                    </Form.Label>
                    <Form.Select
                        required
                        value={editedOrder.CustomerId}
                        onChange={e => setEditedOrder({ ...editedOrder, CustomerId: e.target.value })}>
                        {customers && customers.map(c =>
                            <option value={c.Id} key={c.Id}>
                                {c.FullName}
                            </option>
                        )}
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                        <tr className="">
                            <td>

                                <Form.Select  noValidate defaultValue={0} onChange={e => {
                                const index = e.target.value
                                setNewItem(
                                    {

                                        ProductId: products[index].Id,
                                        Product: products[index],
                                        Quantity: 1
                                    }

                                )
                            }

                            }>
                                <option defaultValue={0} hidden>--Select a product--</option>
                                {products && products.map((val,index) =>
                                    <option defaultValue={0} value={index} key={val.Id}>
                                        {val.ProductName}
                                    </option>
                                )
                                }
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </td>
                            <td>
                                <div>
                                    <img src={newItem.Product.ProductImageUrl} alt={newItem.Product.ProductName} style={{ maxHeight: "50px", marginLeft: "2em" }} />
                                </div>
                            </td>
                            <td>{newItem.Product.ProductPrice}</td>
                            <td></td>
                            <td>
                                <Button onClick={onAddNewItem} variant="outline-primary">Add Item</Button>
                            </td>
                        </tr>
                        {editedOrder.Products && editedOrder.Products.map((item, index) =>
                            <tr key={item.ProductId}>
                                <td colSpan={1}>
                                    <div className="">
                                        {item.Product.ProductName}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <img src={item.Product.ProductImageUrl} alt={item.Product.ProductName} style={{ maxHeight: "50px", marginLeft: "2em" }} />
                                    </div>
                                </td>
                                <td>{item.Product.ProductPrice}</td>
                                <td colSpan={1}>
                                    <Form.Control min={1} required type="number" defaultValue={item.Quantity} onChange={(e) => setItemQuantity(index, e.target.valueAsNumber)} />
                                </td>
                                <td>
                                    <Button onClick={() => removeOrderItem(index)} variant="outline-danger">Remove</Button>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={1} className="weight-bold">Total:</td>
                            <td></td>
                            <td>{calculateTotalPrice()}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <ButtonGroup>
                <Button type="submit">Save Changes</Button>
            </ButtonGroup>
        </Form>
    )
}