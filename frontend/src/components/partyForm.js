import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, DropDownList } from "./formComponents"

const PartyCreationForm = ({ token, userId, user, userCreations }) => {
    const { partyId } = useParams()

    const [name, setName] = useState("")
    const [characters, setCharacters] = useState([])
    const [users, setUsers] = useState([])

    const [gotCharas, setCharas] = useState([])

    useEffect(() => {
        getParty()
        getCharas()

    }, [])

    const getParty = async () => {
        if (partyId === 'new'){
            return
        }
        const gotParty = await createService.getParty(partyId)

        setName(gotParty.name)
        setCharacters(gotParty.characters)
        setUsers(gotParty.users)
    }

    const getCharas = () => {
        setCharas(user.characters)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return(
        <div>
            <h3>Create a Party</h3>

            <form onSubmit={handleSubmit}>
                <NewFormField label="Name" type="text" value={name} setFunction={setName} />
                <DropDownList field="Characters" optionsList={gotCharas} listValue={characters} listSetFunction={setCharacters} />
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default PartyCreationForm