import React, { useEffect, useState } from 'react'
import { Label, Col } from "reactstrap";

export const ReadProductImages = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', "/Images/ProductImageList.txt", false);
    xmlHttp.send(null);
    return xmlHttp.responseText.split('\r\n');
}

export const ProductImageFormComponent = ({ product, setProduct }) => {
    const [productImages, setProductImages] = useState([])

    const selectProductImageList = productImages.map((productImage, index) =>
        <option key={index} value={productImage}>{productImage}</option>
    );

    useEffect(() => {
        var filelist = ReadProductImages();
        setProductImages(filelist);
    }, []);

    return (

        <div className="container px-4 " >
            
            <div className="row gx-5 " >
                <div className="col-10" >
                    <Label for="Image">Image</Label>
                    <div className="col-lg-10">
                            <select className="form-control"
                                defaultValue={productImages[0]}
                                onChange={(e) => setProduct({ ...product, ProductImageUrl: e.target.value })}
                                name="Image" type="image">
                                {selectProductImageList}
                            </select>
                    </div>
                    <br/>
                    <div className="col-lg-2">
                        <img src={product.ProductImageUrl === "" ? productImages[0]: product.ProductImageUrl} alt={product.ProductName} width="150px" height="150px" />
                    </div>
                </div>
            </div>
        </div>
        
    )
}