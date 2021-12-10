import React from "react"

import userService from '../services/users'

const FriendRequest = ({ user, r, setNotif, token }) => {
    console.log("Friendrequest: " + JSON.stringify(r))
    const accept = async () => {
        try{
            const response = await userService.acceptFriendRequest(
                user.id,
                r.sender,
                r.id,
                token
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
        <li>
            <p>
                From: {r.sender.username}
                <button onClick={accept}>accept</button>
            </p>
        </li>
    )
}

export default FriendRequest