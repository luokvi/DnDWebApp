import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import creationsService from '../services/creations'

const CharacterPage = ({ token }) => {
    const { characterId } = useParams()
    const [chara, setChara] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getCharacter()
    },[])

    const getCharacter = async () => {
        const response = await creationsService.getCharacter(characterId, token)
        setChara(response)
    }

    const handleClick = (event) => {
        event.preventDefault()

        navigate('/character/' + characterId)
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
            <div className="formHorPart">
                <h2>{chara.name}</h2>
                    <p>
                        Player: 
                        <Link to={'/user/' + chara.creator.id}>
                            {chara.creator.username}
                        </Link>
                    </p>
            </div>
            <div className="formHorPart">
                <p>Class & level: {chara.class} {chara.level}</p>
                <p>Background: {chara.background}</p>
                <p>Race: {chara.race}</p>
                <p>Personality traits: {chara.personalityTraits}</p>
                <p>Alignment: {chara.alignment}</p>
                <p>Experience points: {chara.experiencePoints}</p>
            </div>
                

            <div className="formHorPart">
                <p>Health: {chara.currentHealth} / {chara.maxHealth}</p>
                <p>Hit dice: {chara.hitDice}</p>
                <p>Armor class: {chara.armorClass}</p>
                <p>Intiative: {chara.initiative}</p>
                <p>Speed: {chara.speed} feet</p>
            </div>

            <div className="formHorPart">
                <p>Strength: {chara.strength}</p>
                <p>Dexterity: {chara.dexterity}</p>
                <p>Constitution: {chara.constitution}</p>
                <p>Intelligence: {chara.intelligence}</p>
                <p>Wisdom: {chara.wisdom}</p>
                <p>Charisma: {chara.charisma}</p>
                <p>Passive wisdom: {chara.passiveWisdom}</p>
            </div>

            <div className="formVerPart">
                <p>Proficiency bonus: {chara.proficiencyBonus}</p>
                <div>
                    <h5>Skills:</h5>
                    <div className="formHorPart">
                        {chara.proficientSkills.map(skill =>
                            <p key={skill}>{skill}</p>
                            )}
                    </div>
                </div>
            </div>

            <div className="formVerPart">
                <h5>Proficiencies:</h5>
                {chara.otherProficiencies.map(prof => 
                    <p key={prof.name}>
                        <b>{prof.name}: {prof.description}</b>
                    </p>
                    )}

                <h5>Languages:</h5>
                <p>
                    {chara.languages.map(lan =>
                        <span key={lan}>{lan} </span>
                    )}
                </p>
            </div>

            <div className="formHorPart">
                <p>Copper: {chara.coins.copper}</p>
                <p>Silver: {chara.coins.silver}</p>
                <p>Electrum: {chara.coins.electrum}</p>
                <p>Gold: {chara.coins.gold}</p>
                <p>Platinum: {chara.coins.platinum}</p>
            </div>

            <div className="formVerPart">
                <h5>Equipment:</h5>
                {chara.equipment.map(e =>
                    <p key={e.id} className="card">
                        <h5>{e.name}</h5>
                        <p>{e.description}</p>
                    </p>
                    )}
            </div>

            <div className="formVerPart">
                <h5>Weapons:</h5>
                {chara.weapons.map(w =>
                    <div key={w.id} className="card">
                        <h5>{w.name}</h5>
                        <p><b>ATK Bonus:</b> {w.atkBonus}</p>
                        <p><b>Damage / Type:</b> {w.damage}</p>
                        <p>Description: {w.description}</p>
                    </div>
                    )}
            </div>

            <div className="formVerPart">
                <h5>Spells:</h5>
                {chara.spells.map(s => 
                    <div key={s.id} className="card">
                        <h5>{s.name}</h5>
                        <p>Level: {s.level}</p>
                        <p>Description: {s.description}</p>
                    </div>
                    )}
                <p>Spellcasting ability: {chara.spellCastingAbility}</p>
            </div>
            
            <div className="formVerPart">
                <h5>Features:</h5>
                {chara.features.map(f =>
                    <div key={f.name} className="formHorPart">
                        <h5>{f.name}</h5>
                        <p>{f.description}</p>
                    </div>
                    )}
            </div>
            
            <div className="card">
                <h5>Notes:</h5>
                <ul>
                    {chara.notes.map(n =>
                        <li>{n}</li>
                    )}
                </ul>
            </div>

            <button onClick={handleClick}>Edit character</button>
        </div>
    )
}

export default CharacterPage