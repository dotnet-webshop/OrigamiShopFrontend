import React, {Component} from 'react';


export class About extends Component {
    static displayName = About.name;

    render() {
        
        return (
            <div>
                <h1>About <small className="text-muted">Origami Webshop</small></h1>


                <p>This is an Origami web shop that "sells" handmade origami created from professional artisans.
                    It is a web shop group project that can handle the basic shopping process.
                    The web shop views such as the shopping cart and displaying all products should take place
                    in a single page without reloading.
                </p>

                <h3>Project’s Features:</h3>
                <p><strong>Admin:</strong></p>
                <ul>
                    <li>The admin interface is able to edit products, users, orders, etc..</li>
                    <li>Ability to create and edit Users</li>
                    <li>Ability to create and edit Products</li>
                    <li>Handling and change orders </li>
                </ul>

                <p><strong>User:</strong></p>
                <ul>
                    <li>Shopping history in the User’s management page</li>
                    <li>The user should be able to login and be authorized using Identity classes, for shopping history</li>
                    <li>allowing users to place orders</li>
                </ul>

                <p><strong>Product:</strong></p>
                <ul>
                    <li>Display pictures of all the products</li>
                </ul>

                <p><strong>Order:</strong></p>
                <ul>
                    <li>A shopping cart, ability to go to cashier and print out a receipt</li>
                </ul>

                <h3>Topics Covered</h3>
                <ol>
                    <li>Use ASP.NET MVC to create the pages</li>
                    <li>Use CSS and Bootstrap to control the layout and appearance of the pages</li>
                    <li>Use JavaScript, JQuery and React to control the site’s front end</li>
                    <li>Use Partial Views</li>
                    <li>Use ASP.NET Identity to handle user registration and login</li>
                    <li>Use roles and authorization to control access to restricted pages.</li>
                    <li>Use Entity Framework for database connections and management</li>
                    
                </ol>

                <p><strong>Authors:</strong></p>
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
