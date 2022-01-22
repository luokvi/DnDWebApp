import React, { useState } from "react"
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import FriendRequest from './friendRequest'

const Character = ({ c }) => {
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()

        navigate("/character/" + c.id)
    }
    return(
        <div>
            <h5>{c.name}</h5>
            <p>level {c.level} {c.class}</p>
            <p>{c.race}</p>
            <button onClick={handleClick}>Edit</button>
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
            <Link to={"/user/" + f.id} >
                {f.username}
            </Link>
        </li>
    )
}

const ProfilePage = ({ user, token }) => {
    const [notifText, setNotif] = useState('')

    if (user === ''){
        return(
            <div>loading...</div>
        )
    }

    // Get just the day of when user was created.
    const dateParts = user.dateCreated[0].split("T")
    const dateCreated = dateParts[0]

    console.log(JSON.stringify(user))
    return(
        <div id={user.username}>
            <h2>{user.username}</h2>
            <p>User since <time dateTime={dateCreated}>{dateCreated}</time></p>

            <h3>Friends:</h3>
            <ul>
            {user.friends.map(friend =>
                <Friend f={friend} key={friend.id}/>
                )}
            </ul>

            <h3>Friend requests:</h3>
            <p>{notifText}</p>
            <ul>
            {user.friendRequests.map(request =>
                <FriendRequest r={request} user={user} setNotif={setNotif} token={token} key={request.id}/>
                )}
            </ul>

            <h3>Characters:</h3>
            < Link to={"/character/new"}>
                Create a new character
            </Link>

            {user.characters.map(chara => 
                <Character c={chara} key={chara.id}/>
                )}

            <Campaign campaigns={user.creations.campaigns} />
            
            <Outlet />
        </div>
    )
}

export default ProfilePage