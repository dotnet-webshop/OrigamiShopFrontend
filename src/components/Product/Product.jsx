import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {cartActions} from "../../state/actions/index"
import {Link} from "react-router-dom";

function Product(props){
    const dispatch = useDispatch()
    const {addProductToCart} = bindActionCreators(cartActions, dispatch)
    return(
        <div className={"product card"} style={{width:"18rem",marginRight:"1rem"}}>
            <img className="card-img-top" src={props.product.ProductImage} alt="product image"/>
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
               
                <button onClick={ () => addProductToCart(props.product) } className="btn btn-outline-primary">Add to cart</button>
            </div>
        </div>
    )
}
export default Product;