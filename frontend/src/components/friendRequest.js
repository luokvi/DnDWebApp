import React from "react"

import userService from '../services/users'

const commonFriends = (user, sender) => {
    var commonFriends = []

    user.friends.forEach(friend => {
        if (sender.friends.includes(friend.id)){
            commonFriends = commonFriends.concat(friend.username)
        }
        
    })
    
    return commonFriends
}

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

    const commonFriendsList = commonFriends(user, r.sender)
    
    return(
        <li>
            <p>
                From: {r.sender.username}
                <button onClick={accept}>accept</button>
            </p>
            <p>You have these friends in common:  
                {commonFriendsList.map(f =>
                    <b key={f}>{f} </b>
                )}
            </p>
        </li>
    )
}

export default FriendRequest