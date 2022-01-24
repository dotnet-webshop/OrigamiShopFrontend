import {Accordion} from 'react-bootstrap';



function OrderDetails({Items}) {
    console.table(Items);
    return (
       
        Items.map(item =>
            <div key={item.Product.Id}>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Shipping Address
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {item.Product.ProductName}
                            </td>
                            <td>
                                {item.Product.ProductPrice}
                            </td>
                            <td>
                                {item.Quantity}
                            </td>
                            <td>
                                {item.ShippingAddress}
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div> )
    );
}

export default OrderDetails;