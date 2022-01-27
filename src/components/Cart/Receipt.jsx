
import { Button } from "react-bootstrap"
import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";

const Reciept = ({ location }) => {
    const order = location?.state?.order
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
        <div>
            <PrintableReciept ref={componentRef} order={order}></PrintableReciept>
            <Button onClick={handlePrint}  variant="outline-primary">Print Reciept</Button>   
            
        </div>
    )
}

const PrintableReciept = React.forwardRef(({order,}, ref) => (
    <div ref={ref} className="p-2">
        <h1 className="mb-5">Order #{order.Id} - Reciept</h1>
        <hr />
        <b className="mb-3">Order Date </b> <p>{new Date(order.OrderDate).toDateString()}</p>
        <b className="mb-3">Email </b> <p>{order.OrderEmail}</p>
        <b className="mb-3">Shipping Address </b><p> {order.ShippingAddress}</p>
        <b className="mb-5">Total cost </b><p>{order.TotalPrice}$</p>
        <hr />
        <h2>Products</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    order.Products.map((item, index) => 
                        <tr key={item.Product.Id + index }>
                            <td>{item.Product.Id}</td>
                            <td>{item.Product.ProductName}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Quantity * item.Product.ProductPrice}$</td>
                        </tr>
                    )
                }
                <tr><td colSpan={3}>
                    <b>Total Price:</b>
                </td>
                    <td>
                        <b>{order.TotalPrice}$</b>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
))

export default Reciept;