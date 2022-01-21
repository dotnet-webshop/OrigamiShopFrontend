import React, {useState} from 'react'
import {Button, Input, Label} from "reactstrap";

const CreateOrderForm = ({onCreate}) => {
    const initalOrder = {
        CustomerId:"",
        ProductPrice:1,
        ProductImageUrl:"",
        ProductDescription:"",
        Stock:0,
        DateCreated:Date.now().toString()
    }
    const [newProduct,setNewProduct] = useState(initialProductState)
    
    const onHandleSubmit = () => {
        if (onCreate)
        {
            onCreate(newProduct)
            setNewProduct({...initialProductState});
        }
        else {
            console.error("onCreate prop not set.")
        }
    }
    return (
        <form>
            <div>
                <Label for="Name">Product Name</Label>
                <Input required name="Name" type="text"
                       value={newProduct.ProductName}
                       onChange={ (e) => setNewProduct({...newProduct,ProductName: e.target.value}) }/>
            </div>
            <div>
                <Label  for="Image">Image</Label>
                <Input
                    value={newProduct.ProductImageUrl}    
                    onChange={(e) => setNewProduct({...newProduct, ProductImage: ""})} name="Image" type="image"/>
            </div>
            <div>
                <Label for="Price">Product Price</Label>
                <Input required name="Price" type="number"
                       value={newProduct.ProductPrice}
                       onChange={ (e) => setNewProduct({...newProduct,ProductPrice: e.target.value}) }/>
            </div>
            <div>
                <Label for="Price">Product Description</Label>
                <Input required name="Description" type="textarea"
                       value={newProduct.ProductDescription}
                       onChange={ (e) => setNewProduct({...newProduct,ProductDescription: e.target.value}) }/>
            </div>
            <div>
                <Label for="Stock">Stock</Label>
                <Input required name="Stock" type="number"
                       value={newProduct.Stock}
                       onChange={ (e) => setNewProduct({...newProduct,Stock:e.target.value}) }/>
            </div>
            <Button onClick={() => onHandleSubmit()}>Create</Button>
        </form>
    )
}

export default CreateOrderForm