import React, {useEffect} from 'react'
import Product from "./Product";
import {endpoints, getAll} from "../../services/api";

function ProductList(props) {
    const [products,setProducts] = React.useState([]);
    
    useEffect(() => {
        let mounted = true;
        getAll(endpoints.products)
            .then(items => {
                if(mounted) {
                    setProducts(items)
                }
            })
        return () => mounted = false;
    }, [])
    
    return (
        <div>
            <h4>Products</h4>
            <section className="d-flex flex-wrap">
                {products.map((product) => 
                 <Product key={product.Id} product={product}>
                     
                 </Product>   
                )}
            </section>
        </div>
    );
}
export default ProductList;