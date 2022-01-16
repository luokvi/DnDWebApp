import react, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, AddToSimpleList, AddItemToList } from "./formComponents"

const NewForm = ({ token, handleSubmitToBackend }) => {
    const { characterId } = useParams()
    const [character, setCharacter] = useState({})

    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [charClass, setClass] = useState("")
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

    const [acrobatics, setAcrobatics] = useState("")
    const [animalHandling, setAnimalHandling] = useState("")
    const [arcana, setArcana] = useState("")
    const [athletics, setAthletics] = useState("")
    const [deception, setDeception] = useState("")
    const [history, setHistory] = useState("")
    const [insight, setInsight] = useState("")
    const [intimidation, setIntimidation] = useState("")
    const [investigation, setInvestigation] = useState("")
    const [medicine, setMedicine] = useState("")
    const [nature, setNature] = useState("")
    const [perception, setPerception] = useState("")
    const [performance, setPerformance] = useState("")
    const [persuasion, setPersuasion] = useState("")
    const [religion, setReligion] = useState("")
    const [sleightOfHand, setSleightOfHand] = useState("")
    const [stealth, setStealth] = useState("")
    const [survival, setSurvival] = useState("")

    const [lan, setLan] = useState([])
    const [otherProficiencies, setOtherProficiencies] = useState([])
    const [features, setFeatures] = useState([])
    
    const [weapons, setWeapons] = useState([])
    const [spellCasting, setSpellCasting] = useState("")
    const [spells, setSpells] = useState([])
    const [equip, setEquip] = useState([])
    const [storage, setStorage] = useState([])

    const [copper, setCopper] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)
    const [platinum, setPlatinum] = useState(0)
    const [electrum, setElectrum] = useState(0)

    useEffect(() => {
        getCharacter()

        // TODO: get weapons, spells, equipment.
    }, [])

    const getCharacter = async () => {
        let chara = ""
        try {
            chara = await createService.getCharacter(characterId, token)
        } catch{
            // If no character found, return from this function.
            return
        }
        setCharacter(chara)
        setName(chara.name)
        setRace(chara.race)
        setClass(chara.class)
        setLevel(chara.level)
        setExp(chara.experiencePoints)
        setBackground(chara.background)
        setPersonality(chara.personalityTraits)
        setAlignment(chara.alignment)
        setHealth(chara.maxHealth)
        setHitDice(chara.hitDice)
        setArmorClass(chara.armorClass)
        setInitiative(chara.initiative)
        setSpeed(chara.speed)
        setStrength(chara.strength)
        setDex(chara.dexterity)
        setConstitution(chara.constitution)
        setInt(chara.intelligence)
        setWis(chara.wisdom)
        setCha(chara.charisma)
        setPWis(chara.passiveWisdom)
        setBonus(chara.proficiencyBonus)
        // TODO: set proficiencies

        setLan(chara.languages)
        setOtherProficiencies(chara.otherProficiencies)
        setFeatures(chara.features)
        setWeapons(chara.weapons)
        setSpellCasting(chara.spellCastingAbility)
        setSpells(chara.spells)
        setEquip(chara.equipment)
        setStorage(chara.storage)

        setCopper(chara.coins.copper)
        setSilver(chara.coins.silver)
        setGold(chara.coins.gold)
        setPlatinum(chara.coins.platinum)
        setElectrum(chara.coins.electrum)

        console.log("Chara:")
        console.log(chara)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log("Submit")
        console.log(character)
        
        // Get Proficiencies from checkboxes.
        let listOfProficiencies = [acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation,
            medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival]
            
        listOfProficiencies = listOfProficiencies.filter(p => p !== '')

        const newCharacter = {
            name: name,
            race: race,
            class: charClass,
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
            proficiencies: listOfProficiencies,
            languages: lan,
            otherProficiencies: otherProficiencies,
            weapons: weapons,
            spellCastingAbility: spellCasting,
            spells: spells,
            equipment: equip,
            storage: storage,
            features: features,
            coins: {
                copper: copper,
                silver: silver,
                gold: gold,
                platinum: platinum,
                electrum: electrum
            }
        }
        console.log(newCharacter)

        // Send new character to backend or update existing one.
        handleSubmitToBackend(newCharacter)
    }

    return(
        <div>
            <h2>Testing...</h2>
            <form onSubmit={handleSubmit}>
                <NewFormField type="text" label="Name" value={name} setFunction={setName} />
                <NewFormField type="text" label="Race" value={race} setFunction={setRace}/>
                <NewFormField type="text" label="Class" value={charClass} setFunction={setClass}/>
                <NewFormField type="number" label="Level" value={level} setFunction={setLevel} min="0" max="100" />
                <NewFormField type="number" label="Experience Points" value={exp} setFunction={setExp} min="0" />
                <NewFormField type="text" label="Background" value={background} setFunction={setBackground}/>
                <NewFormField type="text" label="Personality" value={personality} setFunction={setPersonality}/>
                <NewFormField type="text" label="Alignment" value={alignment} setFunction={setAlignment} />
                <NewFormField type="number" label="Hit Points" value={health} setFunction={setHealth} min="0" />
                <NewFormField type="text" label="Hit Dice" value={hitDice} setFunction={setHitDice} />
                <NewFormField type="number" label="Armor Class" value={armorClass} setFunction={setArmorClass} min="0" max="20" />
                <NewFormField type="number" label="Initiative" value={initiative} setFunction={setInitiative} min="0" max="20" />
                <NewFormField type="number" label="Speed" value={speed} setFunction={setSpeed} min="0" max="20" />
                <NewFormField type="number" label="Strength" value={strength} setFunction={setStrength} min="0" max="20" />
                <NewFormField type="number" label="Dexterity" value={dex} setFunction={setDex} min="0" max="20" />
                <NewFormField type="number" label="Constitution" value={constitution} setFunction={setConstitution} min="0" max="20" />
                <NewFormField type="number" label="Intelligence" value={int} setFunction={setInt} min="0" max="20" />
                <NewFormField type="number" label="Wisdom" value={wis} setFunction={setWis} min="0" max="20" />
                <NewFormField type="number" label="Charisma" value={cha} setFunction={setCha} min="0" max="20" />
                <NewFormField type="number" label="Passive Wisdom" value={pWis} setFunction={setPWis} min="0" max="20" />
                <NewFormField type="number" label="Proficiency Bonus" value={bonus} setFunction={setBonus} min="0" max="20" />

                <AddToSimpleList listHeader="Languages" label="New Language" listValue={lan} listSetFunction={setLan} />
                <AddItemToList listHeader="Proficiencies" listValue={otherProficiencies} listSetFunction={setOtherProficiencies} />
                
                <NewFormField type="text" label="Spell Casting Ability" value={spellCasting} setFunction={setSpellCasting} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewForm