import ProtectedRoute from "../ProtectedRoute";
import AdminAccount from "./AdminAccount";
import AdminProductTable from "./AdminProductTable";
import AdminCustomersTable from "./AdminCustomersTable";
import AdminOrdersTable from "./AdminOrdersTable";
import React, {Fragment} from "react";

const AdminRoutes = () => {
    return(
        <Fragment>
            <ProtectedRoute exact path='/admin-panel/account' adminRoute={true} component={AdminAccount} />
            <ProtectedRoute exact path='/admin-panel/products' adminRoute={true} component={AdminProductTable} />
            <ProtectedRoute exact path='/admin-panel/customers' adminRoute={true} component={AdminCustomersTable} />
            <ProtectedRoute exact path='/admin-panel/orders' adminRoute={true} component={AdminOrdersTable} />
        </Fragment>
    )
}
export default AdminRoutes