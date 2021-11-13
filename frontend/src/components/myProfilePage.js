import React, { useState } from "react"

const ProfilePage = ({ user }) => {
    
    return(
        <div>
            <h2>{user.username}</h2>
        </div>
    )
}

export default ProfilePage