import react, { useState  } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'

const EditingCharacter = ({ token }) => {
    const [characterToEdit, setCharacter] = useState("")
    const { characterId } = useParams()

    const GetCharacterToEdit = async () => {
        
        const chara = await createService.getCharacter(characterId, token)

        console.log("Chara:")
        console.log(characterToEdit.name)
        setCharacter(chara)

          
    }

    if (characterId === undefined){
        return(
            <div>
                <p>...</p>
            </div>
        )
    } else {
        GetCharacterToEdit()
    }

    return(
        <di>
            <p>Editing character {characterId}</p>
        </di>
    )
}

export default EditingCharacter