import React from 'react'
import { Label } from "reactstrap";

export const ReadProductImages = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', "/Images/ProductImageList.txt", false); // false for synchronous request
    xmlHttp.send(null);
    var ret = xmlHttp.responseText;
    return ret.split('\r\n');
}

export const FormEditProductImage = ({ newProduct, productImages,  setNewProduct }) => {
    const selectProductImageList = productImages.map(productImage =>
        <option value={productImage}>{productImage}</option>
    );

    return (
        <div>
            <Label for="Image">Image</Label>
            <div className="row">
                <div className="col-lg-10">
                    <select className="form-control"
                        value={newProduct.ProductImageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductImageUrl: e.target.value })}
                        name="Image" type="image">
                        {selectProductImageList}
                    </select>
                </div>
                <div className="col-lg-2">
                    <img src={newProduct.ProductImageUrl} alt={newProduct.ProductName} width="150px" height="150px" />
                </div>
            </div>
        </div>
    )
}