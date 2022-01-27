import {useSelector} from "react-redux";
import AdminNav from "../Cart/AdminNav";
import React, { useEffect, useState } from "react";
import {endpoints,getOne} from '../../services/api';
import EditAdminForm from "./EditAdminForm";
const AdminAccount = () => {
    const user = useSelector(state => state.user);
    const [adminUser,setAdminUser] = useState({
        Id:"",
        FullName:"",
        Email:"",
        Phone:"",
    })

    useEffect( () => {
        getOne(endpoints.customers, user.Id)
        .then(data => setAdminUser({...data}))
    }, [])
    return (
        <div>
            <AdminNav currentRoute="account"/>
            <article>
                <h2 >&emsp;Admin Panel -<small className="font-monospace text-muted">Account </small></h2>
                <p>
                    Welcome <b> {adminUser.FullName}</b>!

                </p>
                <p>
                    In the Admin Panel you can edit products, customers, and orders.
                    You can also change your own information.
                </p>
            </article>
            <hr/>
            <h2>Your info</h2>
            <EditAdminForm adminUser={adminUser}></EditAdminForm>
        </div>
    )
}
export default AdminAccount;