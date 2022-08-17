import React from "react";
import SystemAlert from "./SystemAlert";
import {Button} from "react-bootstrap";

function TopContent(props) {
    return (
        <React.Fragment>
            <h1 className="mb-4">Welcome to my blog</h1>
            <SystemAlert showAlert={props.showAlert} setShowAlert={props.setShowAlert} message={props.message}/>
        </React.Fragment>
    );
}

export default TopContent;