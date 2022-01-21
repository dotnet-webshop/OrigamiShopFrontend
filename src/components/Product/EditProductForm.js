import React, {useEffect, useState} from 'react'
import {Button, Input, Label} from "reactstrap";
import { ReadProductImages, FormEditProductImage } from "./ProductImage"

const EditProductForm = ({product,onSubmit}) => {

    const [newProduct,setNewProduct] = useState(product)
    const [productImages, setProductImages] = useState([])

    useEffect(() => {
        setNewProduct(product)

        var filelist = ReadProductImages();
        setProductImages(filelist);

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

    const selectProductImageList = productImages.map(productImage =>
        <option value={productImage}>{productImage}</option>
    );

    return (
        <form>
            <div>
                <Label for="Name">Product Name</Label>
                <Input required name="Name" type="text"
                       value={newProduct.ProductName}
                       onChange={ (e) => setNewProduct({...newProduct,ProductName: e.target.value}) }/>
            </div>
            <FormEditProductImage newProduct={newProduct} productImages={productImages} setNewProduct={setNewProduct} />
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