import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import { endpoints, getOne} from "../../services/api";
import axios from "axios";



function OrderDetails({Items}) {
    console.table(Items);
    return (
        
            
        Items.map(item =>
                <div>
                    <p>{item.Product.ProductName}</p>
    
                </div>)
            
       
    );
}

export default OrderDetails;