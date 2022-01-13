import react, { useState  } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'

const EditingCharacter = ({ token }) => {
    const [characterToEdit, setCharacter] = useState("")
    const { characterId } = useParams()

    if (characterId === undefined){
        return(
            <div>
                <p>...</p>
            </div>
        )
    }

    const GetCharacterToEdit = async () => {
        
          
    }

    return(
        <di>
            <p>Editing character {characterId}</p>
        </di>
    )
}

export default EditingCharacter