import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import creationsService from '../services/creations'

const CharacterPage = ({ token }) => {
    const id = useParams
    const [chara, setChara] = useState("")

    useEffect(() => {
        getCharacter()
    },[])

    const getCharacter = async () => {
        const response = creationsService.getCharacter(id, token)
        setChara(response)
    }

    if (chara === ""){
        return(
            <div>
                <p>loading...</p>
            </div>
        )
    }

    return(
        <div>
            <h2>{chara.name}</h2>
            <Link to={'/user/' + chara.creator.id}>
                {chara.creator.username}
            </Link>
        </div>
    )
}

export default CharacterPage