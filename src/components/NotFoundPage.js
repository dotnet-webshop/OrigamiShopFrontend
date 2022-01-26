import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <p>&nbsp;</p>
            <h1>Ooops!</h1>
            <h2>We can't seem to find the page you're looking for...</h2>
            <p>&nbsp;</p>
            <img src="/images/PageNotFound.png" width="346" height="300" />
            <p>&nbsp;</p>
            <p>
                <Link to="/">Go to Home </Link>
            </p>
            <button className="btn btn-outline-primary" onClick={() => history.back()}>Go Back</button>
        </div>
    )
}

export default NotFoundPage;