import {useSelector} from "react-redux";
import AdminNav from "../Cart/AdminNav";
import React, {useEffect, useState} from "react";
import {create, deleteById, endpoints, getAll} from "../../services/api";
import CreateProductForm from "../Product/CreateProductForm";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

const AdminProductTable = () => {
    const user = useSelector(state => state.user);
    const [products,setProducts] = useState([])
    useEffect(() => {
       getAll(endpoints.products).then(data => setProducts([...data])) 
    },[]);
    
    const onHandleCreateProduct = (newProduct) => {
        create(endpoints.products,newProduct).then(res => {
            setProducts([...products,res]);
        })
    }

    const onHandleDelete = (id) => {
        console.log(id)
        deleteById(endpoints.products,id)
            .then( () => {
                let list = [...products]
                let i = list.findIndex(p => p.Id === id)
                if (i >= 0)
                {
                    list.splice(i,1)
                    console.log(list)
                    setProducts([...list])
                }
            });
    }
    return (
        <div>
            <AdminNav currentRoute={"products"}/>
            <div>
                <h1>Admin Panel - Products</h1>
                <CreateProductForm onCreate={onHandleCreateProduct}/>
            </div>
            <p>All products</p>
            <table className="table  table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => 
                <tr key={product.Id}>
                    <td>{product.Id}</td>
                    <td>
                        <Link className="" to={"/product/"+product.Id}>{product.ProductName}</Link>
                    </td>
                    <td className="">
                        <img className="img-thumbnail" style={{maxWidth:"100px"}} src={product.ProductImageUrl} alt={product.ProductName}/>
                    </td>
                    <td>${product.ProductPrice}</td>
                    <td>{product.Stock}</td>
                    <td><Button outline color="danger" onClick={()=>onHandleDelete(product.Id)}>Delete</Button></td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default AdminProductTable;