import Card from "./components/Card";

function List({id, cards, toggleDone, updateCardText, deleteCard}) {
    //todo: implement delete, priority and check button handlers
    // that update the correct list element
    return (
        <div id={id}>
        {
            cards.map((item) => (
                <Card
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    done={item.doneStatus}
                    toggleDone={(id) => toggleDone(id)}
                    updateCardText={(e, id) => updateCardText(e, id)}
                    deleteCard={(id) => deleteCard(id)}
                />
            ))
        }
        </div>
    )

}

export default List