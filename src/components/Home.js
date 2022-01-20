import React, {Component} from 'react';
import ProductList from "./Product/ProductList";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
          <h1>Origami Shop</h1>
          <ProductList/>
      </div>
    );
  }
}
