import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {bindActionCreators} from "redux";
import {cartActions} from "../../state/actions/index"
import {Button, Input} from "reactstrap";

function Cart(props) {
    const cart = useSelector((state) => state.cart)
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch()
    const {setCartItemQuantity, removeCartItemFromCart} = bindActionCreators(cartActions, dispatch)
    
    const onQuantityChanged = (event, productId) => {
        let quantity = parseInt(event.target.value)
        if (Number.isNaN(quantity)) {
            quantity = 1
            event.target.value = quantity
        }
        setCartItemQuantity(productId, quantity)
    }
    return (
        <section className={"shopping-cart"}>
            <h2>Cart</h2>
            <div>
                
                {cartItems.map((cartItem, index) =>
                    <div className=""  key={"cart-item-" + index}>
                        <div className={"d-flex "}>
                            <p className="">{cartItem.product.ProductName}</p>
                            <Input style={{width:"10rem"}}
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
                
            </div>
            <div>
                {
                    cartItems.length <= 0 ? (<div> <h3>Your Cart is empty</h3> </div>)
                     :
                        (<div>
                            <span>
                                {cart.totalPrice}
                            </span>
                            <Button type="button" className="btn btn-primary">
                                Checkout
                            </Button>
                        </div>)
                    
                }
            </div>
        </section>
    )
}

export default Cart;