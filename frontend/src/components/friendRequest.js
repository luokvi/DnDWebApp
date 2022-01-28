import React from "react"
import { Link } from "react-router-dom"

import userService from '../services/users'

const FriendRequest = ({ user, r, setNotif, token }) => {
    console.log("Friendrequest: " + JSON.stringify(r))

    const accept = async () => {
        try{
            const response = await userService.acceptFriendRequest(
                user.id,
                r.sender.id,
                r.id,
                token
            )
            console.log(response)
            setNotif(
                "Added friend " + 
                r.sender.username
                )
        }catch{
            setNotif(
                "Error occured when accepting friend request from " + 
                r.sender.username
                )
        }
    }
    
    return(
        <li>
            <p>
                From: <Link to={"/user/" + r.sender.id}>
                        {r.sender.username}
                    </Link>
                <button onClick={accept}>Accept</button>
            </p>
        </li>
    )
}

export default FriendRequest