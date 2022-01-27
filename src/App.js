import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './custom.css'
import { About } from './components/About';
import Cart from "./components/Cart/Cart";
import Reciept from "./components/Cart/Receipt"
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/Register/Register";
import { CustomerProfile } from './components/Customer/CustomerProfile';
import { userActions } from "./state/actions/index";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoutes from "./components/Admin/AdminRoutes";
import ProductDetails from "./components/Product/ProductDetails";
import OrderDetailsPage from './components/Admin/OrderDetailsPage';
import NotFoundPage from "./components/NotFoundPage";
import AdminAccount from "./components/Admin/AdminAccount";
import AdminProductTable from "./components/Admin/AdminProductTable";
import AdminCustomersTable from "./components/Admin/AdminCustomersTable";
import AdminOrdersTable from "./components/Admin/AdminOrdersTable";


const App = (props) => {
    const dispatch = useDispatch()
    const { updateLoginState } = bindActionCreators(userActions, dispatch)
    useEffect(() => {
        updateLoginState()
    }, [props.match])
    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <ProtectedRoute exact path='/customer-profile' adminRoute={false} component={CustomerProfile} />
                <Route exact path='/about' component={About} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/product/:productId' component={ProductDetails} />
                <Route exact path='/cart/receipt/' component={Reciept} />
                <ProtectedRoute exact path='/cart' adminRoute={false} component={Cart} />
                <ProtectedRoute exact path='/orders/:orderId' adminRoute={true} component={OrderDetailsPage} />
                <ProtectedRoute exact path='/admin-panel/account' adminRoute={true} component={AdminAccount} />
                <ProtectedRoute exact path='/admin-panel/products' adminRoute={true} component={AdminProductTable} />
                <ProtectedRoute exact path='/admin-panel/customers' adminRoute={true} component={AdminCustomersTable} />
                <ProtectedRoute exact path='/admin-panel/orders' adminRoute={true} component={AdminOrdersTable} />
                <Route exact path="/404" component={NotFoundPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </Layout>
    );
}

export default App;