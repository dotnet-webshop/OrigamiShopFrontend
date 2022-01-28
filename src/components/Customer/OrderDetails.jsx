import { Accordion } from 'react-bootstrap';



function OrderDetails({ Items }) {
    console.table(Items);
    return (
        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10">
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
                    </tr>
                </thead>
                <tbody>
                    {
                        Items.map(item =>
                            <tr key={item.Product.Id}>
                                <td>
                                    {item.Product.ProductName}
                                </td>
                                <td>
                                    ${item.Product.ProductPrice}
                                </td>
                                <td>
                                    {item.Quantity}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails;