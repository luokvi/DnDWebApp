import React, { useParams } from "react"
import userService from '../services/users'

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

const Friend = ({ f }) => {
    return(
        <li key={f.id}>
            {f.username}
        </li>
    )
}

const UserPage = async () => {
    const { userId } = useParams()
    const user = await userService.getUser(userId)

    if (user === ''){
        return(
            <div>loading...</div>
        )
    }

    console.log(JSON.stringify(user))
    return(
        <div id={user.username}>
            <h2>{user.username}</h2>
            <h3>Friends:</h3>
            <ul>
            {user.friends.map(friend =>
                <Friend f={friend} />
                )}
            </ul>
            <h3>Characters:</h3>
            {user.characters.map(chara => 
                <Character c={chara} />
                )}
            <Campaign campaigns={user.creations.campaigns} />
        </div>
    )
}

export default UserPage