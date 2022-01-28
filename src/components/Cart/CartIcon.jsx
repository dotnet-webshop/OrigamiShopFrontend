import {useSelector} from "react-redux";

function CartIcon(props) {
    const itemCount = useSelector(state => state.cart.itemCount);
    return (
        <span className="fs-7"style={{ color: 'white'}}>
            {itemCount}       
        </span>
    )

    
}
export default CartIcon;