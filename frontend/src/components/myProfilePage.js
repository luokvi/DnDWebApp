import React from "react"

const Character = ({ c }) => {
    return(
        <div key={c.id}>
            <h5>{c.name}</h5>
            <p>{c.level} level {c.class}, {c.race}</p>
        </div>
    )
}
const Campaign = ({ campaigns }) => {
    if (campaigns.length === 0){
        return(
            null
        )
    }
    return(
        <div>
            <h3>Campaigns:</h3>
            {campaigns.map(c =>
                <div key={c.id}>
                    <h5>{c.name}</h5>
                    <p>{c.description}</p>
                </div>
                )}
        </div>
    )
}

const ProfilePage = ({ user }) => {
    
    if (user === ''){
        return(
            <div>loading...</div>
        )
    }

    console.log(JSON.stringify(user))
    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Characters:</h3>
            {user.characters.map(chara => 
                <Character c={chara} />
                )}
            <Campaign campaigns={user.creations.campaigns} />
        </div>
    )
}

export default ProfilePage