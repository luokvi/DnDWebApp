import react, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'

const NewForm = ({ token }) => {
    const { characterId } = useParams()
    const [character, setCharacter] = useState({})

    const [name, setName] = useState("")
    const [race, setRace] = useState("")

    useEffect(() => {
        getCharacter()
    }, [])

    const getCharacter = async () => {
        if (characterId === undefined){
            return
        }
        
        const chara = await createService.getCharacter(characterId, token)
        setCharacter(chara)
        setName(chara.name)
        setRace(chara.race)

        console.log("Chara:")
        console.log(chara)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log("Submit")
        console.log(character)
        
        const newCharacter = {
            name: name,
            race: race,
        }
        console.log(newCharacter)
    }

    return(
        <div>
            <h2>Testing...</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name} name={"Name"} onChange={({ target }) => setName(target.value)}/>
                </div>
                <div>
                    <label>Race: </label>
                    <input type="text" value={race} name={"Race"} onChange={({ target }) => setRace(target.value)}/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewForm