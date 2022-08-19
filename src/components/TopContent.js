import React, {useContext} from "react";
import SystemAlert from "./SystemAlert";
import AuthContext from "../store/auth-context";

function TopContent(props) {
    const ctx = useContext(AuthContext);
    return (
        <React.Fragment>
            <h1 className="mb-4">Welcome {ctx.currentUserEmail}!</h1>
            <SystemAlert showAlert={props.showAlert} setShowAlert={props.setShowAlert} message={props.message}/>
        </React.Fragment>
    );
}

export default TopContent;