import React, { useState } from "react"
import { useParams } from "react-router-dom"
import userService from '../services/users'

const Character = ({ c }) => {
    return(
        <div key={c.id}>
            <h5>{c.name}</h5>
            <p>{c.level} level {c.class}, {c.race}</p>
        </div>
    )
}
const Campaign = ({ campaigns }) => {
    if (campaigns.length === 0){
        return(
            null
        )
    }
    return(
        <div>
            <h3>Campaigns:</h3>
            {campaigns.map(c =>
                <div key={c.id}>
                    <h5>{c.name}</h5>
                    <p>{c.description}</p>
                </div>
                )}
        </div>
    )
}

const Friend = ({ f }) => {
    return(
        <li key={f.id}>
            {f.username}
        </li>
    )
}

const getUser = async( id, setFunction ) => {
    const user = await userService.getUser(id)

    setFunction(user)
}

const UserPage = () => {
    const [userToView, setUser] = useState('')
    const userId = useParams().id
    getUser(userId, setUser)
    
    console.log("Viewing user: " + JSON.stringify(userToView))

    if (userToView === ''){
        return(
            <div>loading...</div>
        )
    }

    console.log(JSON.stringify(userToView))
    return(
        <div id={userToView.username}>
            <h2>{userToView.username}</h2>
            <h3>Friends:</h3>
            <ul>
            {userToView.friends.map(friend =>
                <Friend f={friend} />
                )}
            </ul>
            <h3>Characters:</h3>
            {userToView.characters.map(chara => 
                <Character c={chara} />
                )}
            <Campaign campaigns={userToView.creations.campaigns} />
        </div>
    )
}

export default UserPage