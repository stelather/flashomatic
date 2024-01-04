import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api/index"
import FormCard from "./FormCard"

function EditCard() {
    const history = useHistory()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    const {deckId, cardId} = useParams()

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        loadDeck()
    }, [deckId])

    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId)
            setCard(response)
        }
        loadCard()
    }, [cardId, setCard])

    const cancelButtonHandler = () => {
        history.push(`/decks/${deckId}`)
    }

    const submitButtonHandler = async (event) => {
        event.preventDefault()
        await updateCard({...card})
        history.push(`/decks/${deckId}`)
    }

    const inputChangeHandler = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <nav className="aria-lable breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <FormCard
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitButtonHandler}
                cancelButtonHandler={cancelButtonHandler}
                card={card}
                type="edit"
            />
        </div>
    )
}

export default EditCard
