import {useSelector} from "react-redux";
import AdminNav from "./AdminNav";
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
                <h2 >&emsp;Admin Panel -<small className="font-monospace text-muted"> Account </small></h2>
                <div className="p-3 border bg-success p-2 text-dark bg-opacity-10">
                    <p>
                        Welcome <b> {adminUser.FullName}</b>!

                    </p>
                    <p className="text-lg-start lh-lg">
                        In the Admin Panel you can edit products, customers, and orders.<br/>
                        You can also change your own information.
                    </p>
                </div>
                
            </article>
            <hr/>
            <h2 >&emsp;Admin's -<small className="font-monospace text-muted">Profile </small></h2>
            <EditAdminForm adminUser={adminUser}></EditAdminForm>
        </div>
    )
}
export default AdminAccount;