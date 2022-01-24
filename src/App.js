import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import './custom.css'
import {About} from './components/About';
import Cart from "./components/Cart/Cart";
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/Register/Register";
import {CustomerProfile} from './components/CustomerProfile';
import {userActions} from "./state/actions/index";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoutes from "./components/Admin/AdminRoutes";
import ProductDetails from "./components/Product/ProductDetails";
import OrderDetailsPage from './components/Admin/OrderDetailsPage';

const App = (props) => {
    const dispatch = useDispatch()
    const {updateLoginState} = bindActionCreators(userActions,dispatch)
    useEffect(() => {
        updateLoginState()
    },[])
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <ProtectedRoute exact path='/customer-profile' adminRoute={false} component={CustomerProfile} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/product/:productId' component={ProductDetails} />
                    <ProtectedRoute exact path='/orders/:orderId' adminRoute={true} component={OrderDetailsPage} />
                    <AdminRoutes/>
                </Switch>
            </Layout>
        );
}

export default App;