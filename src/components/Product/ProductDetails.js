import React, {useEffect, useState} from "react";
import {endpoints, getOne, updateById} from "../../services/api";
import EditProductForm from "./EditProductForm";
import {useSelector} from "react-redux";
// a page to show more details about a product
const ProductDetails = ({ match}) => {
    const user = useSelector(state => state.user)
    const [product,setProduct] = useState({
        ProductName:"",
        Id:0,
        Stock:1,
        ProductPrice:0,
        ProductDescription:"",
        ProductImageUrl:"",
    })
    
    useEffect(()=> {
       getOne(endpoints.products,match.params.productId)
           .then( p => {
               if (p !== null){
                    setProduct( {...p})
               }
           })
    }, [match])
    
    const onHandleEditSubmit = (product) => {
        updateById(endpoints.products,product.Id,product)
            .then(p => {
                if (p !== null)
                {
                    setProduct({...p});
                }
            })
    }
    const view = user.isLoggedIn && user.Role === "Admin" ? <EditProductForm product={product} onSubmit={onHandleEditSubmit}/> : null
    return (
        <div  id="product-details">
            <h2 >&emsp;Admin Panel -<small className="font-monospace text-muted"> Edit Product </small></h2>
            <br />
            {view}
            <br />
            <div className = "bg-success p-2 text-dark bg-opacity-10">
                <div >
                    <h3>{product.ProductName}</h3>
                    <img src={product.ProductImageUrl} alt={product.ProductName}/>
                </div>
                <p>${product.ProductPrice}</p>
                <p>{product.ProductDescription}</p>
            </div>
        </div>
    )
}

export default ProductDetails