import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {NavMenu} from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div >
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <footer className="p-5 mt-5 bg-dark">
            <div className="">
            <small className='d-block text-light mx-auto text-center'>&copy; Copyright {new Date(Date.now()).getFullYear()}</small>
            <ul className="list-inline mx-auto text-center text-light">
                    <li className="list-inline-item"><a href='https://github.com/KimRoys'>Kim Roysdotter, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Nekooos'>Kristoffer, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Michael-Sjogren'>Michael Sjögren, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Rababalsurmi'>Rabab Alsurmi, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/nisseka'>Stefan Sundbeck</a></li>
                </ul>  
            </div>   
        </footer>
      </div>
    );
  }
}
