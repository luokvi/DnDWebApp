import React from "react"

const Character = ({ c }) => {
    return(
        <div key={c.id}>
            <h4>{c.name}</h4>
            <p>{c.level} level {c.class}, {c.race}</p>
        </div>
    )
}
const ProfilePage = ({ user }) => {
    
    if (user === ''){
        return(
            <div>empty</div>
        )
    }

    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Characters:</h3>
            {user.characters.map(chara => 
                <Character c={chara} />
                )}
        </div>
    )
}

export default ProfilePage