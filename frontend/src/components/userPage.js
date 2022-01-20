import React, { useEffect,  } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"

import userService from '../services/users'

const UserPage = ({ user, token }) => {
    const { id } = useParams()

    const [gotUser, setUser] = useState("")
    const [isFriend, setIsFriend] = useState(false)

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
    }

    return(
        <div>
            <h2>User {gotUser.username}</h2>
            {isFriend ? <p>A friend!</p>
                : <button>Send friendrequest</button>
            }
        </div>
    )
}

export default UserPage