import React, {Component} from 'react';
import ProductList from "./Product/ProductList";
import ControlledCarousel from "./Carousel";

export class Home extends Component {
  static displayName = Home.name;
   
  render () {
    return (
      <div >
          
          <ControlledCarousel />

          <br />
          
          <ProductList/>
      </div>
    );
  }
}
