import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {cartActions} from "../../state/actions/index"
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

function Product(props){
    const dispatch = useDispatch()
    const {addProductToCart} = bindActionCreators(cartActions, dispatch)
    return(
        <div className={"product card"} style={{width:"18rem",marginRight:"1rem"}}>
            <img className="card-img-top" src={props.product.ProductImageUrl} alt="product image"/>
            <div className="card-body">
                <h5 className="card-title d-flex">
                    <span className="flex-fill">
                         <Link to={"/product/"+props.product.Id}>
                            {props.product.ProductName}
                         </Link>
                    </span>
                    <span>
                        ${props.product.ProductPrice}
                    </span>
                </h5>
                <p className="card-text">
                    {props.product.ProductDescription}
                </p>
               <div className = "d-grid gap-2 col-6 mx-auto">
                    <button onClick={ () => addProductToCart(props.product) } 
                        className="btn btn-outline-success btn-lg">
                        <FontAwesomeIcon icon={faCartPlus} color=" #145A32"/>
                   </button>
               </div>
                
            </div>
        </div>
    )
} 
export default Product;