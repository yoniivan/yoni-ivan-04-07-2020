import React from 'react';
import { Toast } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa';

const toastMsg = (props) => {
    return(
        <Toast className="toastMsg">
            <Toast.Header style={{justifyContent: "space-between"}}>
                <h2><FaFileAlt/></h2>
                <strong>1 second ago</strong>
            </Toast.Header>
            <Toast.Body>{props.text}</Toast.Body>
        </Toast>
    );
}

export default toastMsg;