import React from 'react'

/*
const selectProductImageList = (productImages) productImages.map(productImage =>
    <option value={productImage}>{productImage}</option>
);
*/

const ReadProductImages = () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', "/Images/ProductImageList.txt", false); // false for synchronous request
    xmlHttp.send(null);
    var ret = xmlHttp.responseText;
    return ret.split('\r\n');
}

export default ReadProductImages
