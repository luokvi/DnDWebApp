import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'

import createService from '../services/creations'

import { AddItemToList, AddToSimpleList, CheckboxField, DropDownList, FormField } from './formComponents'

const CharacterCreation = ({ userId, token, userCreations }) => {
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

    const [gotEquipment, setEquipment] = useState([])
    const [gotSpells, setGotSpells] = useState([])
    const [gotWeapons, setGotWeapons] = useState([])

    const [characterToEdit, setCharacter] = useState("")

    useEffect(() => {
        // Get equipment, spells, and weapons
        setAllItems()

        // If editing character, get the character.
        GetCharacterToEdit()
    }, [])

    const { characterId } = useParams()
    const GetCharacterToEdit = async () => {
        if (characterId === undefined){
            return
        }
        const chara = await createService.getCharacter(characterId, token)

        console.log("Chara:")
        console.log(characterToEdit.name)
        setCharacter(chara)

        setName(characterToEdit.name)
        setRace(characterToEdit.race)
        setClass(characterToEdit.class)
        setLevel(characterToEdit.level)
        setExp(characterToEdit.exp)
        setBackground(characterToEdit.background)
        setPersonality(characterToEdit.personality)
        setAlignment(characterToEdit.alignment)
        setHealth(characterToEdit.maxHealth)
        setHitDice(characterToEdit.hitDice)
        setArmorClass(characterToEdit.armorClass)
        setInitiative(characterToEdit.initiative)
        setSpeed(characterToEdit.speed)
        setStrength(characterToEdit.strength)
        setDex(characterToEdit.dexterity)
        setConstitution(characterToEdit.constitution)
        setInt(characterToEdit.intelligence)
        setWis(characterToEdit.wisdom)
        setCha(characterToEdit.charisma)
        setPWis(characterToEdit.passiveWisdom)
        setBonus(characterToEdit.proficiencyBonus)
        setAcrobatics(characterToEdit.acrobatics)
        setAnimalHandling(characterToEdit.animalHandling)
        setArcana(characterToEdit.arcana)
        setAthletics(characterToEdit.athletics)
        setDeception(characterToEdit.deception)
        setHistory(characterToEdit.history)
        setInsight(characterToEdit.insight)
        setIntimidation(characterToEdit.intimidation)
        setInvestigation(characterToEdit.investigation)
        setMedicine(characterToEdit.medicine)
        setNature(characterToEdit.nature)
        setPerception(characterToEdit.perception)
        setPerformance(characterToEdit.performance)
        setPersuasion(characterToEdit.persuasion)
        setReligion(characterToEdit.religion)
        setSleightOfHand(characterToEdit.sleightOfHand)
        setStealth(characterToEdit.stealth)
        setSurvival(characterToEdit.survival)
        //setLan(characterToEdit.languages)
        //setOtherProficiencies(characterToEdit.otherProficiencies)
        //setFeatures(characterToEdit.features)
        //setWeapons(characterToEdit.weapons)
        setSpellCasting(characterToEdit.spellCastingAbility)
        //setSpells(characterToEdit.spells)
        setEquip(characterToEdit.equipment)
        setStorage(characterToEdit.storage)
        //setCopper(characterToEdit.coins.copper)
        //setSilver(characterToEdit.coins.silver)
        //setGold(characterToEdit.coins.gold)
        //setPlatinum(characterToEdit.coins.platinum)
        //setElectrum(characterToEdit.coins.electrum)    
    }

    const setAllItems = async () => {
        const e = await createService.getEquipment()
        console.log(JSON.stringify(e))
        setEquipment(e)

        // Add user's created equipment.
        setEquipment(gotEquipment.concat(userCreations.equipment))

        const s = await createService.getSpells()
        console.log(JSON.stringify(s))
        setGotSpells(s)

        // Add user's created spells.
        setGotSpells(gotSpells.concat(userCreations.spells))

        const w = await createService.getWeapons()
        console.log(JSON.stringify(w))
        setGotWeapons(w)

        // Add user's created weapons.
        setGotWeapons(gotWeapons.concat(userCreations.weapons))
    }

    const create = async (event) => {
        event.preventDefault()

        // Get Proficiencies from checkboxes.
        let listOfProficiencies = [acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation,
        medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival]
        
        listOfProficiencies = listOfProficiencies.filter(p => p !== '')

        const character = {
            userId: userId,
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

        const created = await createService.createCharacter(character, token)

        console.log("Created character:")
        console.log(JSON.stringify(created))
    }

    return(
        <div>
            <h2>New Character</h2>
            <form onSubmit={create}>
                <FormField id="name" title="Name" type="text" value={name} setFunction={setName} />
                <FormField id="race" title="Race" type="text" value={race} setFunction={setRace} />
                <FormField id="class" title="Class" type="text" value={charClass} setFunction={setClass} />
                <FormField id="level" title="Level" type="number" value={level} setFunction={setLevel} />
                <FormField id="exp" title="Experiencepoints" type="number" value={exp} setFunction={setExp} />
                <FormField id="background" title="Background" type="text" value={background} setFunction={setBackground} />
                <FormField id="personality" title="Personality traits" type="text" value={personality} setFunction={setPersonality} />
                <FormField id="alignment" title="Alignment" type="text" value={alignment} setFunction={setAlignment} />
                <FormField id="health" title="Hitpoints" type="number" value={health} setFunction={setHealth} />
                <FormField id="hitdice" title="Hit Dice" type="text" value={hitDice} setFunction={setHitDice} />
                <FormField id="ac" title="Armor Class" type="number" value={armorClass} setFunction={setArmorClass} />
                <FormField id="intitiative" title="Initiative" type="number" value={initiative} setFunction={setInitiative} />
                <FormField id="speed" title="Speed" type="number" value={speed} setFunction={setSpeed} />
                <FormField id="strength" title="Strength" type="number" value={strength} setFunction={setStrength} />
                <FormField id="dex" title="Dexteriety" type="number" value={dex} setFunction={setDex} />
                <FormField id="const" title="Constitution" type="number" value={constitution} setFunction={setConstitution} />
                <FormField id="int" title="Intelligence" type="number" value={int} setFunction={setInt} />
                <FormField id="wis" title="Wisdom" type="number" value={wis} setFunction={setWis} />
                <FormField id="cha" title="Charisma" type="number" value={cha} setFunction={setCha} />
                <FormField id="pWis" title="Passive Wisdom" type="number" value={pWis} setFunction={setPWis} />
                <FormField id="bonus" title="Proficienct Bonus" type="number" value={bonus} setFunction={setBonus} />
                <div>
                    <h5>Proficiencies</h5>
                    <CheckboxField title={'Acrobatics'} setFunction={setAcrobatics}/>
                    <CheckboxField title={'Animal Handling'} setFunction={setAnimalHandling}/>
                    <CheckboxField title={'Arcana'} setFunction={setArcana}/>
                    <CheckboxField title={'Athletics'} setFunction={setAthletics}/>
                    <CheckboxField title={'Deception'} setFunction={setDeception}/>
                    <CheckboxField title={'History'} setFunction={setHistory}/>
                    <CheckboxField title={'Insight'} setFunction={setInsight}/>
                    <CheckboxField title={'Intimidation'} setFunction={setIntimidation}/>
                    <CheckboxField title={'Investigation'} setFunction={setInvestigation}/>
                    <CheckboxField title={'Medicine'} setFunction={setMedicine}/>
                    <CheckboxField title={'Nature'} setFunction={setNature}/>
                    <CheckboxField title={'Perception'} setFunction={setPerception}/>
                    <CheckboxField title={'Performance'} setFunction={setPerformance}/>
                    <CheckboxField title={'Persuasion'} setFunction={setPersuasion}/>
                    <CheckboxField title={'Religion'} setFunction={setReligion}/>
                    <CheckboxField title={'Sleight of Hand'} setFunction={setSleightOfHand}/>
                    <CheckboxField title={'Stealth'} setFunction={setStealth}/>
                    <CheckboxField title={'Survival'} setFunction={setSurvival}/>
                </div>

                <AddToSimpleList field="Languages" listValue={lan} listSetFunction={setLan} />
                
                <AddItemToList field="Proficiencies" listValue={otherProficiencies} listSetFunction={setOtherProficiencies} />
                <DropDownList field="Weapons" optionsList={gotWeapons} listValue={weapons} listSetFunction={setWeapons} itemType={"Weapon"}/>
                <DropDownList field="Equipment" optionsList={gotEquipment} listValue={equip} listSetFunction={setEquip} itemType={"Equipment"}/>
                <DropDownList field="Spells" optionsList={gotSpells} listValue={spells} listSetFunction={setSpells} itemType={"Spell"} />

                <FormField id="spellCasting" title="Spell Casting Ability" type="text" value={spellCasting} setFunction={setSpellCasting} />

                <FormField id="storage" title="Storage" type="text" value={storage} setFunction={setStorage} />
                
                <AddItemToList field="Features" listValue={features} listSetFunction={setFeatures} />

                <div>
                    <p>Coins:</p>
                    <FormField id="copper" title="Copper" type="number" value={copper} setFunction={setCopper} />
                    <FormField id="silver" title="Silver" type="number" value={silver} setFunction={setSilver} />
                    <FormField id="gold" title="Gold" type="number" value={gold} setFunction={setGold} />
                    <FormField id="platinum" title="Platinum" type="number" value={platinum} setFunction={setPlatinum} />
                    <FormField id="electrum" title="Electrum" type="number" value={electrum} setFunction={setElectrum} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CharacterCreation