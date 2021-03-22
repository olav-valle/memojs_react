import CardButton from "./CardButton";
import {useState} from "react";

function CheckButton(props) {

    const [done, setDone] = useState(false);

    function toggleCircleCheckIcon() {
        //todo toggle own classes: zmdi-check <-> zmdi-check-circle
        setDone(!done)
        props.toggleDone();
    }

    return (
        <CardButton
            className={`checkBtn zmdi ${done ? "zmdi-check-circle" : "zmdi-check"}`}
            onClick={() => toggleCircleCheckIcon()}
        />)
}

export default CheckButton