import React, { useEffect,  } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"

import userService from '../services/users'

const UserPage = ({ user, token }) => {
    const { id } = useParams()

    const [gotUser, setUser] = useState("")
    const [isFriend, setIsFriend] = useState(false)
    const [hasFriendRequest, setRequest] = useState(false)
    const [hasSentFriendRequest, setSentRequest] = useState(false)

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const u = await userService.getOtherUser(id)
        setUser(u)

        // Check if this user is a friend.
        user.friends.forEach(f => {
          if (f.id === id){
              setIsFriend(true)
          }  
        })

        // Check if friendrequest.
        user.friendRequests.forEach(r => {
            if (r.sender.id === id){
                setRequest(true)
            }
        })

        // Check if sent friendrequest.
        user.sentFriendRequests.forEach(r => {
            console.log(r)
            if (r.receiver === id){
                setRequest(true)
            }
        })
    }

    return(
        <div>
            <h2>User {gotUser.username}</h2>
            {isFriend ? <p>A friend!</p>
                : hasFriendRequest ? <button>Accept friendRequest</button>
                    : hasSentFriendRequest ? <p>Sent friendrequest</p>
                        : <button>Send friendrequest</button>
            }
        </div>
    )
}

export default UserPage