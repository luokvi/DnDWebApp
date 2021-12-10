import React, { useState } from "react"

import createCharacter from '../services/creations'

const FormField = ({ id, title, type, value, setFunction }) => {
    return(
        <div>
            {title}: 
            <input id={id} type={type} value={value} name={title}
            onChange={({ target }) => setFunction(target.value)}/>
        </div>
    )
}

const CharacterCreation = ({ userId, token }) => {
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [level, setLevel] = useState("")
    const [exp, setExp] = useState("")
    const [background, setBackground] = useState("")
    const [personality, setPersonality] = useState("")
    const [alignment, setAlignment] = useState("")
    const [health, setHealth] = useState("")
    const [hitDice, setHitDice] = useState("")
    const [armorClass, setArmorClass] = useState("")
    const [initiative, setInitiative] = useState("")
    const [speed, setSpeed] = useState("")
    const [strength, setStrength] = useState("")
    const [dex, setDex] = useState("")
    const [constitution, setConstitution] = useState("")
    const [int, setInt] = useState("")
    const [wis, setWis] = useState("")
    const [cha, setCha] = useState("")
    const [pWis, setPWis] = useState("")
    const [bonus, setBonus] = useState("")
    const [proficiencies, setProficiencies] = useState("")
    const [lan, setLan] = useState("")
    const [otherProficiencies, setOtherProficiencies] = useState("")
    const [weapons, setWeapons] = useState("")
    const [spellCasting, setSpellCasting] = useState("")
    const [spells, setSpells] = useState("")
    const [equip, setEquip] = useState("")
    const [storage, setStorage] = useState("")
    const [features, setFreatus] = useState("")
    const [coins, setCoins] = useState("")

    const create = (event) => {
        event.preventDefault()

        const character = {
            creator: userId,
            name: name,
            race: race,
            level: level,
            experiencePoints: exp,
            background: background,
            personalityTraits: personality,
            alignment: alignment,
            maxHealth: health,
            hitDice: hitDice,
            armorClass: armorClass,
            initiative: initiative,
            speed: speed,
            strength: strength,
            dexterity: dex,
            constitution: constitution,
            intelligence: int,
            wisdom: wis,
            charisma: cha,
            passiveWisdom: pWis,
            proficiencyBonus: bonus,
            proficiencies: proficiencies,
            languages: lan,
            otherProficiencies: otherProficiencies,
            weapons: weapons,
            spellCastingAbility: spellCasting,
            spells: spells,
            equipment: equip,
            storage: storage,
            features: features,
            coins: coins
        }

        createCharacter(character, token)
    }

    return(
        <div>
            <h2>New Character</h2>
            <form onSubmit={create}>
                <FormField id="name" title="Name" type="text" value={name} setFunction={setName} />
                <FormField id="race" title="Race" type="text" value={race} setFunction={setRace} />
                <FormField id="level" title="Level" type="number" value={race} setFunction={setLevel} />
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CharacterCreation