import {useDispatch, useSelector} from "react-redux";
import React, { useState, useEffect } from "react";
import {bindActionCreators} from "redux";
import {cartActions} from "../../state/actions/index"
import { Button, Input } from "reactstrap";
import { endpoints, create, getOne } from "../../services/api";

function Cart(props) {
    const cart = useSelector((state) => state.cart)
    const cartItems = useSelector((state) => state.cart.items)
    const CustomerId = useSelector((state) => state.user.Id)
    const dispatch = useDispatch()
    const { setCartItemQuantity, removeCartItemFromCart } = bindActionCreators(cartActions, dispatch)
 
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

    const [order ,setOrder] = useState(initialState)


    const onQuantityChanged = (event, productId) => {
        let quantity = parseInt(event.target.value)
        if (Number.isNaN(quantity)) {
            quantity = 1
            event.target.value = quantity
        }
        setCartItemQuantity(productId, quantity)
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
        create(endpoints.orders, order)
            .then(response => console.log(response))
    }

    return (
        <section className={"shopping-cart"}>
            <h2 className="mb-5">Cart</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                
                {cartItems.map((cartItem, index) =>
                    <div   key={"cart-item-" + index}>
                        <div className={"d-flex "}>
                            <p className="mr-3">{cartItem.product.ProductName}</p>
                            <Input style={{ width: "10rem" }}
                                   onChange={(e) => onQuantityChanged(e, cartItem.product.Id)}
                                   type={"number"}
                                   defaultValue={cartItem.quantity}
                                   min={1}
                                   max={cartItem.product.Stock}
                            />

                            <Button
                                className={"bg-transparent btn btn-outline-danger"}
                                onClick={() => removeCartItemFromCart(cartItem.product.Id)}
                            >X</Button>
                        </div>
                    </div>)
                }
                    <div>
                        Shipping Address
                        <Input value={order.ShippingAddress} name="shippingAddress" 
                            type="text" 
                            onChange={(e)=>setOrder({...order,ShippingAddress:e.target.value})}/>
                    </div>
                    <div>
                        Email
                        <Input value={order.OrderEmail} name="orderEmail" 
                            type="text" 
                            onChange={(e)=>setOrder({...order,OrderEmail:e.target.value})}/>
                    </div>
                </div>
                
                
                <div className="mb-5">
                {
                    cartItems.length <= 0 ? (<div> <h3>Your Cart is empty</h3> </div>)
                     :
                        (<div >
                            <span>
                                Total: {cart.totalPrice}$
                            </span>
                        </div>)
                }
            </div>
                <input type="submit" value="Checkout" className="btn btn-primary" />
            </form>
        </section>
    )
}

export default Cart;