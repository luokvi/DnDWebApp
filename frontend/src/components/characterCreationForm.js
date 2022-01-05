import React, { useState, useEffect } from "react"

import createService from '../services/creations'

import { AddItemToList, AddToSimpleList, CheckboxField, DropDownList, FormField } from './formComponents'

const CharacterCreation = ({ userId, token }) => {
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

    const [itemNameValue, itemNameSet] = useState("")
    const [itemDescriptionValue, itemDescriptionSet] = useState("")
    const [spellLevel, levelSet] = useState("")
    const [castingTime, castingTimeSet] = useState("")
    const [rangeValue, rangeSet] = useState("")
    const [verbal, verbalSet] = useState("")
    const [somatic, somaticSet] = useState("")
    const [material, materialSet] = useState("")
    const [components, componentsSet] = useState([])
    const [minutesValue, minutesSet] = useState("")
    const [isConcentrationValue, concentrationSet] = useState("")
    const [atkValue, atkSet] = useState("")
    const [damageValue, damageSet] = useState("")
    
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
    const [gotWeapons, setGotWeaopns] = useState([])

    useEffect(() => {
        // Get equipment, spells, and weapons
        setAllItems()
    }, [])

    const createNewItem = async () => {

        if (verbal !== ""){
            console.log("verbal selected")
            // For some reason, these componentSets don't work. components list ends up empty.
            componentsSet([...components, "Verbal"])
            verbalSet("")
        }
        if (somatic !== ""){
            console.log("somatic selected")
            componentsSet([...components, "Somatic"])
            somaticSet("")
        }
        if (material !== ""){
            console.log("material selected")
            componentsSet([...components, "Material"])
            materialSet("")
        }
        console.log(components)

        const isConcentration = isConcentrationValue === "Is Concentration" ? true : false

        // Add to backend.
        const newItem = {
            "itemType": "Spell", // TODO: get actual item type
            "name": itemNameValue,
            "description": itemDescriptionValue,
            "level": spellLevel,
            "castingTime": castingTime,
            "range": rangeValue,
            "components": components,
            "duration": {
                "minutes": minutesValue,
                "isConcentration": isConcentration
            },
            "atkBonus": atkValue,
            "damage": damageValue,
            "userId": userId
            
        }

        const createdItem = await createService.createItem(newItem, token)
        console.log(createdItem)

        if (createdItem !== undefined){
            // Add created item to list.
            setSpells([...spells, createdItem.id])
            //setItemNames([...addedItemNames, createdItem.name])

            itemNameSet("")
            itemDescriptionSet("")
            levelSet("")
            castingTimeSet("")
            rangeSet("")
            verbalSet("")
            somaticSet("")
            materialSet("")
            minutesSet("")
            concentrationSet("")
            atkSet("")
            damageSet("")
        }
        else {
            //TODO: set notification that an error occured.
            console.log("error")
        }

        componentsSet([""])
    }

    const setAllItems = async () => {
        const e = await createService.getEquipment()
        console.log(JSON.stringify(e))
        setEquipment(e)

        const s = await createService.getSpells()
        console.log(JSON.stringify(s))
        setGotSpells(s)

        const w = await createService.getWeapons()
        console.log(JSON.stringify(w))
        setGotWeaopns(w)
    }

    const create = (event) => {
        event.preventDefault()

        // Get Proficiencies from checkboxes.
        let listOfProficiencies = [acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation,
        medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival]
        
        listOfProficiencies = listOfProficiencies.filter(p => p !== '')

        const character = {
            creator: userId,
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

        console.log(JSON.stringify(character))
        createService.createCharacter(character, token)
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

                <div>
                    <DropDownList field="Weapons" optionsList={gotWeapons} listValue={weapons} listSetFunction={setWeapons} newItemFunction={createNewItem} itemType={"Weapon"}/>
                    <FormField id="wName" title="Name" value={itemNameValue} setFunction={itemNameSet} />
                    <FormField id="wDesc" title="Description" value={itemDescriptionValue} setFunction={itemDescriptionSet}/>
                    <FormField id="weaponAtk" title="ATK Bonus" value={atkValue} setFunction={atkSet} type="Number" />
                    <FormField id="weaponDmg" title="Damage Type" value={damageValue} setFunction={damageSet} />
                    <FormField id="weaponRange" title="Range" value={rangeValue} setFunction={rangeSet} type="Number" />
                    <button onClick={createNewItem}>create</button>
                </div>
                <div>
                    <DropDownList field="Equipment" optionsList={gotEquipment} listValue={equip} listSetFunction={setEquip} newItemFunction={createNewItem} itemType={"Equipment"}/>
                    <FormField id="eName" title="Name" value={itemNameValue} setFunction={itemNameSet} />
                    <FormField id="eDesc" title="Description" value={itemDescriptionValue} setFunction={itemDescriptionSet}/>
                    <button onClick={createNewItem}>create</button>
                </div>
                
                <div>
                    <DropDownList field="Spells" optionsList={gotSpells} listValue={spells} listSetFunction={setSpells}newItemFunction={createNewItem} itemType={"Spell"} />
                    <FormField id="sName" title="Name" value={itemNameValue} setFunction={itemNameSet} />
                    <FormField id="sDesc" title="Description" value={itemDescriptionValue} setFunction={itemDescriptionSet}/>
                    <FormField id="spellLevel" title="Level" value={spellLevel} setFunction={levelSet} type="Number" />
                    <FormField id="spellCasting" title="Casting Time" value={castingTime} setFunction={castingTimeSet} />
                    <div>
                        <p>Components needed:</p>
                        <CheckboxField title="Verbal" setFunction={verbalSet} />
                        <CheckboxField title="Somatic" setFunction={somaticSet} />
                        <CheckboxField title="Material" setFunction={materialSet} />
                    </div>
                    <FormField id="spellRange" title="Range" value={rangeValue} setFunction={rangeSet} type="Number" />                        
                    <div>
                        <p>Spell Duration</p>
                        <FormField id="spellMinutes" title="Duration, minutes" value={minutesValue} setFunction={minutesSet} type="Number" />
                        <CheckboxField title="Is Concentration" setFunction={concentrationSet}/>
                    </div>
                    <button onClick={createNewItem}>create</button>
                </div>

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