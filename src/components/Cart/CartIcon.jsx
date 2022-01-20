import {useSelector} from "react-redux";

function CartIcon(props) {
    const itemCount = useSelector(state => state.cart.itemCount);
    return (
        <span>
            {itemCount}       
        </span>
    )

    
}
export default CartIcon;