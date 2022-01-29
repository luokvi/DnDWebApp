import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import createService from '../services/creations'
import { NewFormField, AddToSimpleList, AddItemToList, CheckboxField, DropDownList } from "./formComponents"
import { EquipmentCreationForm, SpellCreationForm, WeaponCreationForm } from "./itemCreationForm"

const CharacterForm = ({ token, userId, handleSubmitToBackend, userCreations }) => {
    const { characterId } = useParams()
    const [isNewCharacter, setIsNew] = useState(true)

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

    const [acrobatics, setAcrobatics] = useState("0")
    const [animalHandling, setAnimalHandling] = useState("0")
    const [arcana, setArcana] = useState("0")
    const [athletics, setAthletics] = useState("0")
    const [deception, setDeception] = useState("0")
    const [history, setHistory] = useState("0")
    const [insight, setInsight] = useState("0")
    const [intimidation, setIntimidation] = useState("0")
    const [investigation, setInvestigation] = useState("0")
    const [medicine, setMedicine] = useState("0")
    const [nature, setNature] = useState("0")
    const [perception, setPerception] = useState("0")
    const [performance, setPerformance] = useState("0")
    const [persuasion, setPersuasion] = useState("0")
    const [religion, setReligion] = useState("0")
    const [sleightOfHand, setSleightOfHand] = useState("0")
    const [stealth, setStealth] = useState("0")
    const [survival, setSurvival] = useState("0")

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

    const [notes, setNotes] = useState([])

    const [gotEquipment, setGotEquipment] = useState([])
    const [gotSpells, setGotSpells] = useState([])
    const [gotWeapons, setGotWeapons] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getCharacter()
        getItems()
    }, [])

    const getCharacter = async () => {
        let chara = ""
        if (characterId === "new"){
            return
        }
        try {
            chara = await createService.getCharacter(characterId, token)
        } catch{
            // If no character found, return from this function.
            return
        }
        setIsNew(false)

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
        // Set proficiencient skills.
        const proficientSkills = chara.proficientSkills
        proficientSkills.forEach(skill => {
            switch(skill) {
                case 'Acrobatics':
                    setAcrobatics("Acrobatics")
                    break
                case 'Animal Handling':
                    setAnimalHandling("Animal Handling")
                    break
                case 'Arcana':
                    setArcana("Arcana")
                    break
                case 'Athletics':
                    setAthletics("Athletics")
                    break    
                case 'Deception':
                    setDeception("Deception")
                    break
                case 'History':
                    setHistory("History")
                    break
                case 'Insight':
                    setInsight("Insight")
                    break
                case 'Intimidation':
                    setIntimidation("Intimidation")
                    break
                case 'Investigation':
                    setInvestigation("Investigation")
                    break
                case 'Medicine':
                    setMedicine("Medicine")
                    break
                case 'Nature':
                    setNature("Nature")
                    break
                case 'Perception':
                    setPerception("Perception")
                    break
                case 'Performance':
                    setPerformance("Performance")
                    break
                case 'Persuasion':
                    setPersuasion("Persuasion")
                    break
                case 'Religion':
                    setReligion("Religion")
                    break
                case 'Sleight of Hand':
                    setSleightOfHand("Sleight of Hand")
                    break
                case 'Stealth':
                    setStealth("Stealth")
                    break
                case 'Survival':
                    setSurvival("Survival")
                    break
                default:
                    break
            }
        });

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

        setNotes(chara.notes)

        console.log("Chara:")
        console.log(chara)
    }

    const getItems = async () => {
        // Get public equipment.
        const e = await createService.getEquipment()
        // Add user's created equipment.
        const allEquipment = e.concat(userCreations.equipment)
        setGotEquipment(allEquipment)

        const s = await createService.getSpells()
        const allSpells = s.concat(userCreations.spells)
        setGotSpells(allSpells)

        const w = await createService.getWeapons()
        const allWeapons = w.concat(userCreations.weapons)
        setGotWeapons(allWeapons)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        // Get Proficiencies from checkboxes.
        let listOfProficiencies = [acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation,
            medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival]
            
        listOfProficiencies = listOfProficiencies.filter(p => p !== '0')

        const newCharacter = {
            userId: userId,
            characterId: characterId,
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
            proficientSkills: listOfProficiencies,
            languages: lan,
            otherProficiencies: otherProficiencies,
            // Save only weapon ids.
            weapons: weapons.map(w => w.id),
            spellCastingAbility: spellCasting,
            // Save only spell ids.
            spells: spells.map(s => s.id),
            // Save only equipment ids.
            equipment: equip.map(e => e.id),
            storage: storage.map(s => s.id),
            features: features,
            coins: {
                copper: copper,
                silver: silver,
                gold: gold,
                platinum: platinum,
                electrum: electrum
            },
            notes: notes
        }

        // Send new character to backend or update existing one.
        handleSubmitToBackend(newCharacter, isNewCharacter)

        //Move to profile page.
        navigate("/myProfile")

    }

    return(
        <div>
            { isNewCharacter ? <h2>Create New Character</h2>
                : <h2>Edit Character <i>{name}</i></h2>
            }

            <form onSubmit={handleSubmit} className="formContainer">
                <div className="formHorPart">
                    <NewFormField type="text" label="Name" value={name} setFunction={setName} required/>
                </div>
                <div className="formHorPart">
                    <NewFormField type="text" label="Race" value={race} setFunction={setRace}/>
                    <NewFormField type="text" label="Class" value={charClass} setFunction={setClass}/>
                    <NewFormField type="number" label="Level" value={level} setFunction={setLevel} min="0" max="100" />
                    <NewFormField type="number" label="Experience Points" value={exp} setFunction={setExp} min="0" required/>
                </div>
                <div className="formHorPart">
                    <NewFormField type="text" label="Background" value={background} setFunction={setBackground}/>
                    <NewFormField type="text" label="Personality" value={personality} setFunction={setPersonality}/>
                    <NewFormField type="text" label="Alignment" value={alignment} setFunction={setAlignment} />
                </div>
                <div className="formHorPart">
                    <NewFormField type="number" label="Hit Points" value={health} setFunction={setHealth} min="0" />
                    <NewFormField type="text" label="Hit Dice" value={hitDice} setFunction={setHitDice} />
                    <NewFormField type="number" label="Armor Class" value={armorClass} setFunction={setArmorClass} min="0" max="20" />
                    <NewFormField type="number" label="Initiative" value={initiative} setFunction={setInitiative} min="-20" max="20" />
                    <NewFormField type="number" label="Speed" value={speed} setFunction={setSpeed} min="0" />
                </div>
                <div className="formVerPart">
                    <NewFormField type="number" label="Strength" value={strength} setFunction={setStrength} min="0" max="20" />
                    <NewFormField type="number" label="Dexterity" value={dex} setFunction={setDex} min="0" max="20" />
                    <NewFormField type="number" label="Constitution" value={constitution} setFunction={setConstitution} min="0" max="20" />
                    <NewFormField type="number" label="Intelligence" value={int} setFunction={setInt} min="0" max="20" />
                    <NewFormField type="number" label="Wisdom" value={wis} setFunction={setWis} min="0" max="20" />
                    <NewFormField type="number" label="Charisma" value={cha} setFunction={setCha} min="0" max="20" />
                    <NewFormField type="number" label="Passive Wisdom" value={pWis} setFunction={setPWis} min="0" max="20" />
                    <NewFormField type="number" label="Proficiency Bonus" value={bonus} setFunction={setBonus} min="0" max="20" />
                </div>
                
                <div className="formVerPart">
                    <h4>Proficiencies</h4>
                    <CheckboxField title='Acrobatics' label="Acrobatics" value={acrobatics} setFunction={setAcrobatics}/>
                    <CheckboxField title='AnimalHandling' label="Animal Handling" value={animalHandling} setFunction={setAnimalHandling}/>
                    <CheckboxField title='Arcana' label="Arcana" value={arcana} setFunction={setArcana}/>
                    <CheckboxField title='Athletics' label="Athletics" value={athletics} setFunction={setAthletics}/>
                    <CheckboxField title='Deception' label="Deception" value={deception} setFunction={setDeception}/>
                    <CheckboxField title='History' label="History" value={history} setFunction={setHistory}/>
                    <CheckboxField title='Insight' label="Insight" value={insight} setFunction={setInsight}/>
                    <CheckboxField title='Intimidation' label="Intimidation" value={intimidation} setFunction={setIntimidation}/>
                    <CheckboxField title='Investigation' label="Investigation" value={investigation} setFunction={setInvestigation}/>
                    <CheckboxField title='Medicine' label="Medicine" value={medicine} setFunction={setMedicine}/>
                    <CheckboxField title='Nature' label="Nature" value={nature} setFunction={setNature}/>
                    <CheckboxField title='Perception' label="Perception" value={perception} setFunction={setPerception}/>
                    <CheckboxField title='Performance' label="Performance" value={performance} setFunction={setPerformance}/>
                    <CheckboxField title='Persuasion' label="Persuasion" value={persuasion} setFunction={setPersuasion}/>
                    <CheckboxField title='Religion' label="Religion" value={religion} setFunction={setReligion}/>
                    <CheckboxField title='SleightOfHand' label="Sleight of Hand" value={sleightOfHand} setFunction={setSleightOfHand}/>
                    <CheckboxField title="Stealth" label="Stealth" value={stealth} setFunction={setStealth} />
                    <CheckboxField title="Survival" label="Survival" value={survival} setFunction={setSurvival} />
                </div>
                <div className="formVerPart">
                    <AddToSimpleList listHeader="Languages" label="New Language" listValue={lan} listSetFunction={setLan} />
                </div>
                <div className="formVerPart">
                    <AddItemToList listHeader="Other Proficiencies" listValue={otherProficiencies} listSetFunction={setOtherProficiencies} />
                </div>
                <div className="formVerPart">
                    <NewFormField type="text" label="Spell Casting Ability" value={spellCasting} setFunction={setSpellCasting} />
                    <DropDownList field="Spells" optionsList={gotSpells} listValue={spells} listSetFunction={setSpells} />
                </div>
                <div className="formVerPart">
                    <DropDownList field="Equipment" optionsList={gotEquipment} listValue={equip} listSetFunction={setEquip} />
                </div>
                <div className="formVerPart">
                    <DropDownList field="Weapons" optionsList={gotWeapons} listValue={weapons} listSetFunction={setWeapons} />
                </div>
                <div className="formVerPart">
                    <AddItemToList listHeader="Features" listValue={features} listSetFunction={setFeatures} />
                </div>
                
                <div className="formVerPart">
                    <h4>Coins</h4>
                    <NewFormField type="Number" label="Copper" value={copper} setFunction={setCopper} min="0"/>
                    <NewFormField type="Number" label="Silver" value={silver} setFunction={setSilver} min="0"/>
                    <NewFormField type="Number" label="Gold" value={gold} setFunction={setGold} min="0"/>
                    <NewFormField type="Number" label="Platinum" value={platinum} setFunction={setPlatinum} min="0"/>
                    <NewFormField type="Number" label="Electrum" value={electrum} setFunction={setElectrum} min="0"/>
                </div>
                <div className="formVerPart">
                    <AddToSimpleList listHeader="Notes" label="New Note" listValue={notes} listSetFunction={setNotes} />
                </div>
                
                <button type="submit">Submit</button>
            </form>

            <div className="formContainer">
                <div className="formHorPart">
                    <EquipmentCreationForm userId={userId} token={token} equipList={gotEquipment} setEquipList={setGotEquipment} />
                </div>
                <div className="formHorPart">
                    <SpellCreationForm userId={userId} token={token} spellsList={gotSpells} setSpellsList={setGotSpells} />
                </div>
                <div className="formHorPart">
                    <WeaponCreationForm userId={userId} token={token} weaponsList={gotWeapons} setWeaponsList={setGotWeapons}/>
                </div>
            </div>
            
        </div>
    )
}

export default CharacterForm