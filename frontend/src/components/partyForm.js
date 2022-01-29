import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, DropDownList } from "./formComponents"

export const AddFriendToPartyForm = ({ token, user, friendId }) => {
    const [selected, setSelected] = useState("")

    let parties = user.creations.parties
    parties = parties.filter(p => !p.users.includes(friendId))
    if (parties.length === 0){
        return(
            <></>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (selected === ""){
            return
        }

        createService.addUserToParty(selected, friendId, token, user.id)
    }

    return(
        <form onSubmit={handleSubmit} className="formHorPart">
            <select name="Party" onChange={({ target }) => setSelected(target.value)} defaultValue={""}>
                {parties.map( p =>
                    <option key={p.id} value={p.id} >
                        {p.name}
                    </option>
                    )}
                <option value="">Select a Party</option>
            </select>
            <button type="submit">Add to Party</button>
        </form>
    )
}

const PartyCreationForm = ({ token, userId, user }) => {
    const { partyId } = useParams()
    const [isNewParty, setIsNewParty] = useState(true)

    const [name, setName] = useState("")
    const [characters, setCharacters] = useState([])
    const [users, setUsers] = useState([])

    const [gotCharas, setCharas] = useState([])
    const [gotUsers, setGotUsers] = useState([])

    const navigate = useNavigate()

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
        setIsNewParty(false)
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

        console.log(isNewParty)
        const newParty = {
            name: name,
            characters: characters.map(c => c.id),
            users: [...users.map(u => u.id), userId],
            id: !isNewParty ? partyId : "",
            userId: userId
        }

        if (isNewParty === true){
            console.log("new party")
            const created = await createService.createParty(newParty, token)
        } else {
            console.log("updating")
            const created = await createService.updateParty(newParty, token)
        }
        

        navigate('/myProfile')
    }

    return(
        <div>
            <h3>Create a Party</h3>

            <form onSubmit={handleSubmit} className="formContainer">
                <div className="formHorPart">
                    <NewFormField label="Name" type="text" value={name} setFunction={setName} />
                </div>
                <div className="formHorPart">
                    <DropDownList field="Characters" optionsList={gotCharas} listValue={characters} listSetFunction={setCharacters} oneValue={true} />
                </div>
                <div className="formHorPart">
                    <DropDownList field="Other users" optionsList={gotUsers} listValue={users} listSetFunction={setUsers} oneValue={true} />
                </div>
                
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default PartyCreationForm