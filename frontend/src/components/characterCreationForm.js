import React, { useState } from "react"

import createService from '../services/creations'

const FormField = ({ id, title, type, value, setFunction }) => {
    return(
        <div>
            {title}: 
            <input id={id} type={type} value={value} name={title}
            onChange={({ target }) => setFunction(target.value)}/>
        </div>
    )
}

const CheckboxField = ({ title, setFunction }) => {
    return(
        <div>
            <input type="checkbox" id={title} name={title}
            value={title} onChange={({ target }) => setFunction(target.value)}/>
            <label htmlFor={title}>{title}</label>
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

    const [proficiencies, setProficiencies] = useState([])
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

    const [lan, setLan] = useState("")
    const [otherProficiencies, setOtherProficiencies] = useState("")
    const [weapons, setWeapons] = useState("")
    const [spellCasting, setSpellCasting] = useState("")
    const [spells, setSpells] = useState("")
    const [equip, setEquip] = useState("")
    const [storage, setStorage] = useState("")
    const [features, setFreatus] = useState("")
    const [copper, setCopper] = useState(0)
    const [silver, setSilver] = useState(0)
    const [gold, setGold] = useState(0)
    const [platinum, setPlatinum] = useState(0)
    const [electrum, setElectrum] = useState(0)

    const create = (event) => {
        event.preventDefault()

        // Get Proficiencies from checkboxes.
        const listOfProficiencies = [acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation,
        medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival]
        
        listOfProficiencies.forEach( prof => {
          if (prof !== ''){
            setProficiencies(...proficiencies, prof)
          }
        })

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
                    <p>Proficiencies</p>
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
                <FormField id="lan" title="Languages" type="text" value={lan} setFunction={setLan} />
                <FormField id="oprof" title="Other Profiencies" type="text" value={otherProficiencies} setFunction={setOtherProficiencies} />
                <FormField id="weapons" title="Weapons" type="text" value={weapons} setFunction={setWeapons} />
                <FormField id="spellCasting" title="Spell Casting Ability" type="text" value={spellCasting} setFunction={setSpellCasting} />
                <FormField id="spells" title="Spells" type="text" value={spells} setFunction={setSpells} />
                <FormField id="equip" title="Equipment" type="text" value={equip} setFunction={setEquip} />
                <FormField id="storage" title="Storage" type="text" value={storage} setFunction={setStorage} />
                <FormField id="features" title="Features" type="text" value={features} setFunction={setFreatus} />
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