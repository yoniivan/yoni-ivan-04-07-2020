import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './noMatch.css';

const NotFound = () => {
    return(
        <Jumbotron className="nomatch">
            <h1>
                404 Page not found
            </h1>
        </Jumbotron>
    );
}

export default NotFound;