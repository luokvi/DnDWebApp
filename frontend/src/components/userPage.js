import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getUser } from "../reducers/userReducer"

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

const UserPage = () => {
    const userId = useParams().userId
    const dispatch = useDispatch()

    // Get user to reducer when page is rendered.
    useEffect(() =>{
        dispatch(getUser(userId))

    }, [dispatch, userId])

    // Get user from reducer.
    const userToView = useSelector(({ user }) => {
        return user
    })
    
    console.log("Viewing user: " + JSON.stringify(userToView))

    if (userToView === ''){
        return(
            <div>loading...</div>
        )
    }

    console.log(JSON.stringify(userToView))
    return(
        <div id={userToView.username}>
            <h2>{userToView.username}</h2>
            <h3>Friends:</h3>
            <ul>
            {userToView.friends.map(friend =>
                <Friend f={friend} />
                )}
            </ul>
            <h3>Characters:</h3>
            {userToView.characters.map(chara => 
                <Character c={chara} />
                )}
            <Campaign campaigns={userToView.creations.campaigns} />
        </div>
    )
}

export default UserPage