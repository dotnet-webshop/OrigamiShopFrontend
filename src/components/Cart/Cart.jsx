import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { cartActions } from "../../state/actions/index"
import { Button, Input } from "reactstrap";
import { endpoints, create, getOne, createReturnsResponse } from "../../services/api";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



function Cart(props) {
    const cart = useSelector((state) => state.cart)
    const cartItems = useSelector((state) => state.cart.items)
    const CustomerId = useSelector((state) => state.user.Id)
    const dispatch = useDispatch()
    const { setCartItemQuantity, removeCartItemFromCart, clearCart } = bindActionCreators(cartActions, dispatch)
    const history = useHistory();

    const initialState = {
        CustomerId: '',
        Products: [],
        ShippingAddress: '',
        OrderEmail: '',
    }

    function orderDetail(productId, quantity) {
        this.ProductId = productId;
        this.Quantity = quantity;
    }

    const [order, setOrder] = useState(initialState)


    const onQuantityChanged = (event, productId) => {
        let quantity = parseInt(event.target.value)
        if (Number.isNaN(quantity)) {
            quantity = 1
            event.target.value = quantity
        }
        setCartItemQuantity(productId, quantity)
    }

    const isCartEmpty = () => {
        return cartItems.length <= 0
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        var Products = cartItems.map(product => {
            const newOrderDetail = new orderDetail(
                product.product.Id,
                product.quantity
            )
            return newOrderDetail
        });

        order.CustomerId = CustomerId
        order.Products = Products
        console.log(order)
        createReturnsResponse(endpoints.orders, order)
            .then(response => {
                console.log(response)
                if (response.status >= 200 && response.status < 300) {
                    clearCart()
                    history.push({
                        pathname: "/cart/receipt/",
                        state: { order: response.data }
                    })
                }
            })

    }


    return (
        <section className={"shopping-cart"}>

            <h2 className="mb-3"><small className="font-monospace text-muted">&emsp;Shopping Cart </small></h2>
            <div className="p-3 border bg-success p-2 text-dark bg-opacity-10">
                <form onSubmit={handleSubmit}>
                    <div  >
                    
                        {cartItems.map((cartItem, index) =>
                            <div key={"cart-item-" + index}>
                                <div className={"d-flex "}>
                                    <p className="mr-3">{cartItem.product.ProductName}</p>
                                    <Input className = " m-1" style={{ width: "5rem" }}
                                        onChange={(e) => onQuantityChanged(e, cartItem.product.Id)}
                                        type={"number"}
                                        defaultValue={cartItem.quantity}
                                        min={1}
                                        max={cartItem.product.Stock}
                                    />

                                    <Button
                                        className={"m-2 bg-transparent btn btn-outline-danger"}
                                        onClick={() => removeCartItemFromCart(cartItem.product.Id)}
                                    >X</Button>
                                </div>
                            </div>)
                        }
                        
                        
                    </div>
                    
                    
                    
                <div className="mb-5">
                    {
                        isCartEmpty() ? (<div> <h3>Your Cart is empty !  <FontAwesomeIcon icon={faShoppingCart}color=" #F5B041"/></h3> </div>)
                            :
                            (<div >
                                <span>
                                    Total: {cart.totalPrice}$
                                </span>

                                <div>
                                    <div className = "col-md-6">
                                        Billing Address
                                        <Input value={order.ShippingAddress} name="shippingAddress"
                                            type="text"
                                            onChange={(e) => setOrder({ ...order, ShippingAddress: e.target.value })} />
                                    </div>
                                    <div className = "col-md-6">
                                        Email
                                        <Input value={order.OrderEmail} name="orderEmail"
                                            type="text"
                                            onChange={(e) => setOrder({ ...order, OrderEmail: e.target.value })} />
                                    </div>
                                </div>
                                <input type="submit" value="Checkout" className="btn btn-warning" />

                            </div>)

                    }
                </div>
                </form>
            </div>
        </section>
    )
}

export default Cart;