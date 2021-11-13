import React, { useState } from "react"

const ProfilePage = ({ user }) => {
    try {
        console.log("userid: " + user.id)
        console.log("user: " + user )

        return(
            <div>
                <h2> Characters: </h2>
                {user.characters.map(chara =>
                    <p key={chara.id}>{chara.name}</p>
                )}
            </div>
        )
    } catch {
        return(
            <div>
                <p>Not logged in.</p>
            </div>
        )
    }
    

}

export default ProfilePage