import React, { useEffect, useState} from 'react'
import { Button, Input, Label } from "reactstrap";
import ReadProductImages from "./ProductImage"

const CreateProductForm = ({onCreate}) => {
    const initialProductState = {
        ProductName:"",
        ProductPrice:1,
        ProductImageUrl:"",
        ProductDescription:"",
        Stock:0,
        DateCreated:Date.now().toString()
    }
    const [newProduct,setNewProduct] = useState(initialProductState)
    const [productImages, setProductImages] = useState([])

    useEffect(() => {
        var filelist = ReadProductImages();
        setProductImages(filelist);
   }, []);

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
            <div>
                <Label for="Image">Image</Label>
                <select className="form-control"
                    value={newProduct.ProductImageUrl}    
                    onChange={(e) => setNewProduct({ ...newProduct, ProductImage: e.target.value })}
                    name="Image" type="image">
                    {selectProductImageList}
                </select>
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

export default CreateProductForm