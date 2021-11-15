import React, { useState } from "react"
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

const FriendRequest = ({ user, r, setNotif }) => {
    const accept = async () => {
        try{
            const response = await userService.acceptFriendRequest(
                user.id,
                r.sender,
                r.id
            )
            console.log(response)
            setNotif(
                "Added friend " + 
                r.sender
                )
        }catch{
            setNotif(
                "Error occured when accepting friend request from " + 
                r.sender
                )
        }
    }
    return(
        <li key={r.id}>
            <p>From: {r.sender}</p>
            <button onClick={accept}>accept</button>
        </li>
    )
}

const ProfilePage = ({ user }) => {
    const [notifText, setNotif] = useState('')

    if (user === ''){
        return(
            <div>loading...</div>
        )
    }

    console.log(JSON.stringify(user))
    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Friends:</h3>
            <ul>
            {user.friends.map(friend =>
                <Friend f={friend} />
                )}
            </ul>
            <h3>Friend requests:</h3>
            <p>{notifText}</p>
            <ul>
            {user.friendRequests.map(request =>
                <FriendRequest r={request} user={user} setNotif={setNotif} />
                )}
            </ul>
            <h3>Characters:</h3>
            {user.characters.map(chara => 
                <Character c={chara} />
                )}
            <Campaign campaigns={user.creations.campaigns} />
        </div>
    )
}

export default ProfilePage