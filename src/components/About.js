import React, {Component} from 'react';


export class About extends Component {
    static displayName = About.name;

    render() {
        
        return (
            <div className="container">
                <h3>Origami <small className="text-muted"> Webshop</small></h3>

                <div className="row">
                    <div className="col">
                        <p className="lead">This is an Origami web shop that "sells" handmade origami created from professional artisans.
                        It is a web shop group project that can handle the basic shopping process.
                        The web shop views such as the shopping cart and displaying all products should take place
                        in a single page without reloading.
                        </p>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <h5 className="text-body text-opacity-75">Project’s Features</h5>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col">
                        <p className="text-muted"><strong>Admin:</strong></p>
                        <ul>
                            <li>The admin interface is able to edit products, users, orders, etc..</li>
                            <li>Ability to create and edit Users</li>
                            <li>Ability to create and edit Products</li>
                            <li>Handling and change orders </li>
                        </ul>
                    </div>
                    <div className="col">
                        <p className="text-muted"><strong>User:</strong></p>
                        <ul>
                            <li>Shopping history in the User’s management page</li>
                            <li>The user should be able to login and be authorized using Identity classes, for shopping history</li>
                            <li>allowing users to place orders</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="text-muted"><strong>Product:</strong></p>
                        <ul>
                            <li>Display pictures of all the products</li>
                        </ul>
                    </div>
                    <div className="col">
                        <p className="text-muted"><strong>Order:</strong></p>
                        <ul>
                            <li>A shopping cart, ability to go to cashier and print out a receipt</li>
                        </ul>
                    </div>
                </div>
               
                
                <h5 className="text-body text-opacity-75">Topics Covered</h5> 
                <ol>
                    <li>Use ASP.NET MVC to create the pages</li>
                    <li>Use CSS and Bootstrap to control the layout and appearance of the pages</li>
                    <li>Use JavaScript, JQuery and React to control the site’s front end</li>
                    <li>Use Partial Views</li>
                    <li>Use ASP.NET Identity to handle user registration and login</li>
                    <li>Use roles and authorization to control access to restricted pages.</li>
                    <li>Use Entity Framework for database connections and management</li>
                    
                </ol>

                <p className="text-body text-opacity-75"><strong>Contributors:</strong></p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href='https://github.com/KimRoys'>Kim Roysdotter, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Nekooos'>Kristoffer, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Michael-Sjogren'>Michael Sjögren, </a></li>
                    <li className="list-inline-item"><a href='https://github.com/Rababalsurmi'>Rabab Alsurmi & </a></li>
                    <li className="list-inline-item"><a href='https://github.com/nisseka'>Stefan Sundbeck</a></li>
                </ul>
                
            </div>
        );
    }
}
