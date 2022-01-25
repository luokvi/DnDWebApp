import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, DropDownList } from "./formComponents"

export const AddFriendToPartyForm = ({ token, user, friendId }) => {
    const [selected, setSelected] = useState("")

    const parties = user.creations.parties

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Add to party:")
        console.log(selected)

        createService.AddUserToParty(selected, friendId, token)
    }

    return(
        <form onSubmit={handleSubmit}>
            <select name="Party" onChange={({ target }) => setSelected(target.value)}>
                {parties.map( p =>
                    <option key={p.id} value={p.id} >
                        {p.name}
                    </option>
                    )}
            </select>
            <button type="submit">Add to Party</button>
        </form>
    )
}

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
        let friends = user.friends

        friends = friends.map(f => {
            return(
                {
                    name: f.username,
                    id: f.id
                }
            )
        })

        console.log("Found friends:")
        console.log(friends)
        setGotUsers(friends)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newParty = {
            name: name,
            characters: characters.map(c => c.id),
            users: [...users.map(u => u.id), userId],
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
                <DropDownList field="Characters" optionsList={gotCharas} listValue={characters} listSetFunction={setCharacters} oneValue={true} />
                <DropDownList field="Other users" optionsList={gotUsers} listValue={users} listSetFunction={setUsers} oneValue={true} />
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default PartyCreationForm