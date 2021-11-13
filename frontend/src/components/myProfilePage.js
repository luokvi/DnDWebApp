import React, { useState } from "react"
import userService from '../services/users'

const ProfilePage = ({ userid }) => {
    const [user, setUser] = useState('')
    if (userid === ''){
        return(
            <div>
                <p>Not logged in.</p>
            </div>
        )
    }
    console.log("userid: " + userid)
    userService.getUser(userid).then( profile => {
        setUser(profile)
    })
    console.log("user: " + user )

    return(
        <div>
            <h2> Characters: </h2>
            {user.characters.map(chara =>
                <p key={chara.id}>{chara.name}</p>
            )}
        </div>
    )

}

export default ProfilePage