import React from "react";
import {Alert} from "react-bootstrap";

function SystemAlert(props) {
    return (
        <Alert variant="light" show={props.showAlert} onClose={() => props.setShowAlert(false)} dismissible>
            <p>{props.message}</p>
        </Alert>
    );
}

export default SystemAlert;