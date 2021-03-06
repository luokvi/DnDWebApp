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
        <div className="card">
            <h5><Link to={"/character/view/" + c.id}>
                {c.name}</Link>
            </h5>
            <p>level {c.level} {c.class}</p>
            <p>{c.race}</p>
            <button onClick={handleClick}>Edit</button>
        </div>
    )
}
const Party = ({ p }) => {
    const navigate = useNavigate()
    
    const handleClick = (event) => {
        event.preventDefault()

        navigate("/party/" + p.id)
    }
    return(
        <div className="card">
            <h5>{p.name}</h5>
            {p.characters.map(c =>
                <p key={c.id}>
                    {c.name}: level {c.level} {c.class}
                </p>
            )}
            <button onClick={handleClick}>Edit</button>
        </div>
    )
}
const Parties = ({ parties }) => {
    if (parties.length === 0){
        return(
            null
        )
    }

    return(
        <div>
            <div className="cardContainer">
                {parties.map(p =>
                    <Party p={p} key={p.id}/>
                )}
            </div>
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
    const dateParts = user.dateCreated.split("T")
    const dateCreated = dateParts[0]

    return(
        <div id={user.username}>
            <h2>{user.username}</h2>
            <p className="lighterText">User since <time dateTime={dateCreated}>{dateCreated}</time></p>

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

            <Link to={'/user/all'}>Look for users</Link>

            <h3>Characters:</h3>
            < Link to={"/character/new"}>
                Create a new character
            </Link>

            <div className="cardContainer">
                {user.characters.map(chara => 
                    <Character c={chara} key={chara.id}/>
                    )}
            </div>

            <h3>Parties:</h3>
            <Link to={"/party/new"}>Create a new Party</Link>
            <Parties parties={user.creations.parties} />
            
            <Outlet />
        </div>
    )
}

export default ProfilePage