import React, { useEffect, useState} from 'react'
import { Button, Input, Label, Col } from "reactstrap";
import { ProductImageFormComponent } from "./ProductImage"
import Form from 'react-bootstrap/Form'

const CreateProductForm = ({onCreate}) => {
    const initialProductState = {
        ProductName:"",
        ProductPrice:1,
        ProductImageUrl:"",
        ProductDescription:"",
        DateCreated:Date.now().toString(),
        Stock: 0
    }
    // const initialStockState = { Stock: 0 }

    const [newProduct,setNewProduct] = useState(initialProductState)
    // const [newStock,setNewStock] = useState(initialStockState)
    const [validated, setValidated] = useState(false);
    
    const onHandleSubmit = (e) => {
       
        const form = e.currentTarget;
        let {  min, max } = e.target;
        newProduct.Stock = e.target;
        newProduct.Stock  = Math.max(Number(min), Math.min(Number(max), Number(newProduct.Stock )));
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return
        }
        setValidated(true);
        if (onCreate )
        {
            onCreate(newProduct)
            setNewProduct({...initialProductState});
        }
        else {
            console.error("onCreate prop not set.")
        }
    }

    return (
        <Form  noValidate validated={validated} onSubmit={onHandleSubmit}>
           <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    required
                    name="Name" type="text"
                    value={newProduct.ProductName}
                    onChange={ (e) => setNewProduct({...newProduct,ProductName: e.target.value}) }
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <br />
            <ProductImageFormComponent product={newProduct} setProduct={setNewProduct} />
            <br />
            <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                    aria-describedby="inputGroupPrepend"
                    name="Price" type="number"
                    value={newProduct.ProductPrice}
                    onChange={ (e) => setNewProduct({...newProduct,ProductPrice: e.target.value}) }
                    required
                />
                <Form.Control.Feedback type="invalid">
                   Please provide a valid Product Price.
                </Form.Control.Feedback>
            </Form.Group>
            <br />
           <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Product Description</Form.Label>
                <Form.Control 
                    required 
                    name="Description" type="textarea"
                    value={newProduct.ProductDescription}
                    onChange={ (e) => setNewProduct({...newProduct,ProductDescription: e.target.value}) }
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid Description.
                </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                    required  
                    name="Stock" type="number" min="1"
                    max="250"
                    value={newProduct.Stock}
                    onChange={ (e) => setNewProduct({...newProduct,Stock:e.target.value}) }/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid Stock number.
                </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Button type="submit">Create</Button>
            {/* <Button onClick={(e) => onHandleSubmit(e)}>Create</Button> */}
        </Form>

        // <form>
        //     <div>
        //         <Label for="Name">Product Name</Label>
        //         <Input required name="Name" type="text"
        //                value={newProduct.ProductName}
        //                onChange={ (e) => setNewProduct({...newProduct,ProductName: e.target.value}) }/>
            // </div>
            // <ProductImageFormComponent product={newProduct} setProduct={setNewProduct} />
            // <div>
        //         <Label for="Price">Product Price</Label>
        //         <Input required name="Price" type="number"
        //                value={newProduct.ProductPrice}
        //                onChange={ (e) => setNewProduct({...newProduct,ProductPrice: e.target.value}) }/>
        //     </div>
        //     <div>
        //         <Label for="Price">Product Description</Label>
        //         <Input required name="Description" type="textarea"
        //                value={newProduct.ProductDescription}
        //                onChange={ (e) => setNewProduct({...newProduct,ProductDescription: e.target.value}) }/>
        //     </div>
        //     <div>
        //         <Label for="Stock">Stock</Label>
        //         <Input required name="Stock" type="number"
        //                value={newProduct.Stock}
        //                onChange={ (e) => setNewProduct({...newProduct,Stock:e.target.value}) }/>
        //     </div>
        //     <Button onClick={() => onHandleSubmit()}>Create</Button>
        // </form>
    )
}

export default CreateProductForm