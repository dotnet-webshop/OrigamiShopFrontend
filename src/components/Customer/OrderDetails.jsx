import {Accordion} from 'react-bootstrap';



function OrderDetails({Items}) {
    console.table(Items);
    return (
       
            Items.map(item =>
                <div key={item.Product.Id}>
                    <ul className="list-group list-group-flush" >
                        <li className="list-group-item">Product: {item.Product.ProductName}</li>
                        <li className="list-group-item">Price: {item.Product.ProductPrice}</li>
                        <li className="list-group-item">Quantity: {item.Quantity}</li>
                    </ul> 
               </div> )
    );
}

export default OrderDetails;