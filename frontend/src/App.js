import './App.css';
import List from "./components/List";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

const placeholderCards = [
    {
        UUID: "b27fec87-546f-4f79-94fb-44cce03674b9",
        text: "Finish To Do list app.",
        doneStatus: false,
    },
    {
        UUID: "d4811e33-3569-4fbf-a6da-4284c2f7d3be",
        text: "Don't let the existential dread set in.",
        doneStatus: false,

    },
    {
        UUID: "2775e128-66ff-4f55-916b-51e322d32c8b",
        text: "Do cardio.",
        doneStatus: false,

    },
    {
        UUID: "11dd89bb-7f2a-4869-8c6c-b28a2d08054a",
        text: "Make macaroni.",
        doneStatus: false,

    },
    {
        UUID: "02eae93e-b0da-4f40-82b1-6240989333e8",
        text: "Shop for a new tie.",
        doneStatus: false,
    },
]; // hard code card states here.

const blankCard = [{
    text: "",
    doneStatus: false
}]
function App() {




    //todo: this should take data from DB/backend
    const [items, setItems] = useState([]);
    //todo add a isLoaded boolean to indicate if data has been fetched
    //  use this in the return, to render a 'loading' indicator
    //  that gets replaced by <List> when data has been loaded.

    useEffect(async () => {
            const cards = await axios
                .get('http://localhost:4000/cards/')
                .then(res => setItems(res.data));
            console.log(cards);
        }, []
    );

    // const [existsChecked, setExistsChecked] = useState(items
    //     .some((item) => (item.doneStatus === true))
    // );


    // Fetches cards from server
    async function fetchCards() {
        const cards = await axios
            .get('http://localhost:4000/cards/')
            .then(res => console.log(res.data));
        setItems(cards);
    }

    // Toggles the doneStatus of the item with specified ID.
    function toggleDone(id) {
        const updList = items.map((item) => {
            if (item._id === id) {
                const invDone = !item.doneStatus;
                //todo: make this update existsChecked
                return {
                    ...item,
                    doneStatus: invDone,
                };
            }
            return item;

        });
        setItems(updList);
    }


    function addNewCard() {
        //todo: send card to db, and then update local list from that?
        //  We want the card to have a proper _id field, which mongodb handles when
        //  document is inserted.
        const newItem = [
            {
                text: "test",
                doneStatus: false,
                //todo: add priority level, and split text into title+content?
            }
        ];
        // send new card to backend
        axios
            .post('http://localhost:4000/cards/create-card', newItem)
            .then(res => console.log(res.data));
        // const updItems = items.concat(newItem);
        // setItems(updItems);

    }

    function updateCardText(e, id) {
        const newText = e.target.innerText;
        const updList = items.map((item) => {
            if (item.UUID === id) {
                return {
                    ...item,
                    text: newText,
                };
            }
            return item;

        });

        setItems(updList);
    }

    function deleteCard(id) {
        const updList = items.filter((item) => item._id !== id)

        setItems(updList);
    }

    function removeAllDone() {
        const updList = items.filter((item) => item.doneStatus === false);
        setItems(updList);
    }


    function doesExistChecked() {
        const exists = items
            .some((item) => (item.doneStatus === true))
        //  setExistsChecked(exists);
    }

    function setCardDoneAndUpdateState(id) {
        toggleDone(id);
        doesExistChecked()
    }

    return (
        <div className="App">

            <header>
                <button id="darkModeBtn" className="zmdi zmdi-sun"></button>
                <h1>Memo</h1>

                <div id="itemEntry">

                    <button
                        className="entryButton "
                        id="deleteDone"
                        onClick={removeAllDone}
                        title="Remove all check marked items."
                    >
                        <i className="zmdi-hc-stack zmdi-hc-2x">
                            <i id="bigTrash" className="zmdi zmdi-delete zmdi-hc-stack-2x"></i>
                            <i id="bigCheck" className="zmdi zmdi-check zmdi-hc-stack-1x"></i>
                        </i>
                    </button>
                    <button
                        className="entryButton zmdi zmdi-file-plus zmdi-hc-2x"
                        id="newMemo"
                        onClick={addNewCard}
                    >
                    </button>


                    <button
                        className="entryButton"
                        id="resetButton"
                        //onClick={}
                    >
                        <i className="zmdi zmdi-undo zmdi-hc-3x"></i>
                    </button>
                </div>
            </header>

            <List
                id="list"
                cards={items}
                toggleDone={setCardDoneAndUpdateState}
                updateCardText={updateCardText}
                deleteCard={deleteCard}
            />

        </div>
    );
    //todo: What is the best way to dynamically fill the #list with elements from a DB/file?
    //  Some sort of for-loop..?
    //  {props.children}, and passing to a refactored #list component?

    //todo: Do we collect all the handler functions for buttons etc. in App.js,
    // and write components to accept event handlers as params?

}

export default App;
