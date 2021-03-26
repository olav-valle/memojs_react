import './CardButton'
import CardButton from "./CardButton";
import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";


function Card({id, text, done, toggleDone, updateCardText, deleteCard}) {
    // todo What is the best way to handle button events?
    //     Collect everything in App.js, and pass props?


    //todo: how do we handle check button when Card is controlled by List?
    //  Callbacks in List?
    return (
        <>
        <div id={id} className={`card${done ? " done" : ""}`}>
            <CheckButton toggleDone={() => toggleDone(id)}/>
            <span
                className="itemText"
                onBlur={(e) => updateCardText(e, id)}
                contentEditable={!done}
            >
                {text}
            </span>
            <CardButton className="priStarBtn zmdi zmdi-star-outline"/>
            <DeleteButton onClick={() => deleteCard(id)}/>
        </div>
        </>
    )
}

export default Card