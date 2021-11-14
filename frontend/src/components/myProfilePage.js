import React, { useState } from "react"

const ProfilePage = ({ user }) => {
    console.log(JSON.stringify(user))
    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Characters:</h3>
        </div>
    )
}

export default ProfilePage