import react, { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'

const EditingCharacter = ({ token }) => {
    const [characterToEdit, setCharacter] = useState("")
    const { characterId } = useParams()

    useEffect(() => {
        GetCharacterToEdit()
    }, [])

    const GetCharacterToEdit = async () => {
        if (characterId === undefined){
            return(
                <div>
                    <p>...</p>
                </div>
            )
        }

        const chara = await createService.getCharacter(characterId, token)

        console.log("Chara:")
        console.log(characterToEdit.name)
        setCharacter(chara)

          
    }

    return(
        <div>
            <p>Editing character {characterId}</p>
        </div>
    )
}

export default EditingCharacter