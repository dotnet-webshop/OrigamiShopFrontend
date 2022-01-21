import {Accordion} from 'react-bootstrap';



function OrderDetails({Items}) {
    console.table(Items);
    return (
        
            
        Items.map(item =>
                <div>

                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><srtong>Product: </srtong>{item.Product.ProductName}</Accordion.Header>
                            <Accordion.Body>
                                <p><srtong>Price: </srtong>{item.Product.Price}</p>
                                <p><srtong>Quantity: </srtong>{item.Product.Quantity}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
                </div>)
            
       
    );
}

export default OrderDetails;