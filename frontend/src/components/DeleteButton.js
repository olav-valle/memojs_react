import CardButton from "./CardButton";

function DeleteButton(props) {

    return (
        <CardButton className={`deleteBtn zmdi zmdi-delete`} onClick={props.onClick}/>
    )
}

export default DeleteButton