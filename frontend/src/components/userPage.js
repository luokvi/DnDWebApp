import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import userService from '../services/users'

const UserPage = ({ user, token }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [gotUser, setUser] = useState("")
    const [isFriend, setIsFriend] = useState(false)
    const [hasFriendRequest, setRequest] = useState(false)
    const [hasSentFriendRequest, setSentRequest] = useState(false)

    const [commonFriends, setCommonFriends] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        // If trying to get self, navigate to myProfile.
        if (id === user.id){
            navigate("/myProfile")
            return
        }

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
            if (r.receiver === id){
                setSentRequest(true)
            }
        })

        let common = u.friends
        common.forEach(f => {
            if (!user.friends.includes(f)){
                f = ""
            }
        })
        setCommonFriends(common.filter(f => f !== ""))
    }

    // If no user yet, return loading page
    if (gotUser === ""){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <h2>User {gotUser.username}</h2>
            {isFriend ? <p>A friend!</p>
                : hasFriendRequest ? <button>Accept friendRequest</button>
                    : hasSentFriendRequest ? <p>Sent friendrequest</p>
                        : <button>Send friendrequest</button>
            }

            <h3>Common friends</h3>
            {commonFriends.map(f =>
                <p key={f.id}>{f.username}</p>
            )}

            <h3>Characters</h3>
            {gotUser.characters.map(c => 
                <p key={c.id}>
                    <b>{c.name}</b>, a {c.race}, level {c.level} {c.class}
                </p>
                )}
        </div>
    )
}

export default UserPage