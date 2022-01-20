import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from '../../state/index'

function Customer(props) {
    const dispatch = useDispatch()
    const { orderHistory } = bindActionCreators(actions, dispatch)
    return (
        <div className={"card"} style={{ width: "18rem", marginRight: "1rem" }}>
            <div className="card-header">
                <h5 className="card-title">{props.customer.FullName}</h5>
            </div>
            <div className="card-body">
                <button onClick={() => orderHistory(props.customer)} className="btn btn-outline-success">My Orders</button>
                
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span>Email:</span> ${props.customer.Email}</li>
                    <li className="list-group-item"><span>Phone Number:</span> {props.customer.PhoneNumber}</li>
                    <li className="list-group-item"><span>Shipping Address:</span> {props.customer.DefaultShippingAddress}</li>
                    <li className="list-group-item"><span>Billing Address:</span> {props.customer.BillingAddress}</li>
                </ul>

            </div>
        </div>
    );
}
export default Customer;
