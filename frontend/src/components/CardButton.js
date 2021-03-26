
function CardButton(props) {
    //todo: Should button components be rendered using some form of {props.children}?
    return (
        <button className={`cardButton ${props.className}`} onClick={props.onClick}></button>
        )
}

export default CardButton