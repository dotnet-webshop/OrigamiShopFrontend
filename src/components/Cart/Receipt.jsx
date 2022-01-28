
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
        <h2 className="mb-3"><small className="font-monospace text-muted">Receipt </small></h2>
        <div className="p-3 border bg-light p-2 text-dark " >
            <div className="row g-3">
                <div className="col-md-4">
                    <b className="mb-3">Order Date </b> <p>{new Date(order.OrderDate).toDateString()}</p>
                </div>
            </div>
            <div className="row g-3">
                <div className="col-md-4">
                    <b className="mb-3">Email </b> <p>{order.OrderEmail}</p>
                </div>
                <div className="col-md-4">
                    <b className="mb-3">Shipping Address </b><p> {order.ShippingAddress}</p>
                </div>
                <div className="col-md-4">
                    <b className="mb-5">Total cost </b><p>{order.TotalPrice}$</p>
                </div>
            </div>
        </div>
        <br />
        <h4 className="mb-3"><small className="font-monospace text-muted">Products - </small></h4>
        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >                                  
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
    </div>
))

export default Reciept;