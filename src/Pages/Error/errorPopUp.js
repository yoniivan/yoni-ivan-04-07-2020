
import React from 'react';
import { Alert } from 'react-bootstrap';

const alert = (props) => {

    return(
        <Alert variant="danger" dismissible>
        <Alert.Heading>{props.alertMessage}</Alert.Heading>
        <p>
          This occures due to Maximum number of requests of due to network conection.
        </p>
      </Alert>
    );
}

export default alert;