import {useSelector} from "react-redux";
import AdminNav from "../Cart/AdminNav";
import React from "react";

const AdminAccount = () => {
    const user = useSelector(state => state.user);
    return (
        <div>
            <AdminNav currentRoute="account"/>
            <h1>Admin Panel - Account</h1>
            <p>Welcome {user.Name}!</p>
            
        </div>
    )
}
export default AdminAccount;