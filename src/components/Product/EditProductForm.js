import React, {useEffect, useState} from 'react'
import {Button, Input, Label} from "reactstrap";

const EditProductForm = ({product,onSubmit}) => {

    const [newProduct,setNewProduct] = useState(product)
    useEffect(()=> {
        setNewProduct(product)
    }, [product])
    
    const onHandleSubmit = () => {
        if (onSubmit)
        {
            onSubmit(newProduct)
            setNewProduct({...product});
        }
        else {
            console.error("onSubmit prop not set.")
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
                    type="text"
                    value={newProduct.ProductImageUrl}
                    onChange={(e)=> setNewProduct({...newProduct, ProductImageUrl: e.target.value})}
                    name="Image"/>
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
            <Button onClick={() => onHandleSubmit()}>Edit</Button>
        </form>
    )
}

export default EditProductForm