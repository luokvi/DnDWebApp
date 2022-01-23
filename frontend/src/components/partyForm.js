import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, DropDownList } from "./formComponents"

const PartyCreationForm = ({ token, userId, user }) => {
    const { partyId } = useParams()

    const [name, setName] = useState("")
    const [characters, setCharacters] = useState([])
    const [users, setUsers] = useState([])

    const [gotCharas, setCharas] = useState([])
    const [gotUsers, setGotUsers] = useState([])

    useEffect(() => {
        getParty()
        getCharas()
        getUsers()
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

    const getUsers = () => {
        setGotUsers(user.friends)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newParty = {
            name: name,
            characters: characters.map(c => c.id),
            users: users.map(u => u.id),
            userId: userId,
        }

        const created = await createService.createParty(newParty, token)
        console.log(created)
    }

    return(
        <div>
            <h3>Create a Party</h3>

            <form onSubmit={handleSubmit}>
                <NewFormField label="Name" type="text" value={name} setFunction={setName} />
                <DropDownList field="Characters" optionsList={gotCharas} listValue={characters} listSetFunction={setCharacters} />
                <DropDownList field="Other users" optionsList={gotUsers} listValue={users} listSetFunction={setUsers} />
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default PartyCreationForm