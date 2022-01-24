import AdminNav from "../Cart/AdminNav";
import React, {useEffect, useState} from "react";
import {deleteById, endpoints, getAll} from "../../services/api";
import {Button} from "reactstrap";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

const AdminCustomersTable = () => {
    const [customers,setCustomers] = useState([])
    const user = useSelector(state => state.user)
    useEffect(() => {
        getAll(endpoints.customers).then(data => setCustomers(data))
    },[]);
    
    const onHandleDelete = (id) => {

        deleteById(endpoints.customers,id)
            .then( () => {
                let list = [...customers]
                let i = list.findIndex(c => c.Id === id)
                if (i >= 0)
                {
                    list.splice(i,1)
                    setCustomers([...list])
                }
            })
    }
    return (
        <div>
            <AdminNav currentRoute={"customers"}/>
            <h1>Admin Panel - Customers</h1>
            <p>All customers</p>
            <table className="table  table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => <tr key={customer.Id}>
                    <td>{customer.Id}</td>
                    <td>
                        <Link to={"/customer/"+customer.Id}>{customer.FullName}</Link>
                    </td>
                    <td>{customer.Email}</td>
                    <td>{customer.PhoneNumber}</td>
                    <td><Button color={"danger"} outline onClick={()=> onHandleDelete(customer.Id)}>Delete</Button></td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default AdminCustomersTable;