import react, { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"

import createService from '../services/creations'

const EditingCharacter = (props) => {
    const [characterToEdit, setCharacter] = useState("")
    const { characterId } = useParams()

    useEffect(() => {
        GetCharacterToEdit()
    }, [])

    const GetCharacterToEdit = async () => {
        if (characterId === undefined){
            return(
                <div>
                    <h2>New Character</h2>
                </div>
            )
        }

        const chara = await createService.getCharacter(characterId, props.token)
        setCharacter(chara)

        console.log("Chara:")
        console.log(chara)

        props.setName(characterToEdit.name)
        props.setRace(characterToEdit.race)
        props.setClass(characterToEdit.class)
        props.setLevel(characterToEdit.level)
        props.setExp(characterToEdit.exp)
        props.setBackground(characterToEdit.background)
        props.setPersonality(characterToEdit.personality)
        props.setAlignment(characterToEdit.alignment)
        props.setHealth(characterToEdit.maxHealth)
        props.setHitDice(characterToEdit.hitDice)
        props.setArmorClass(characterToEdit.armorClass)
        props.setInitiative(characterToEdit.initiative)
        props.setSpeed(characterToEdit.speed)
        props.setStrength(characterToEdit.strength)
        props.setDex(characterToEdit.dexterity)
        props.setConstitution(characterToEdit.constitution)
        props.setInt(characterToEdit.intelligence)
        props.setWis(characterToEdit.wisdom)
        props.setCha(characterToEdit.charisma)
        props.setPWis(characterToEdit.passiveWisdom)
        props.setBonus(characterToEdit.proficiencyBonus)
        props.setAcrobatics(characterToEdit.acrobatics)
        props.setAnimalHandling(characterToEdit.animalHandling)
        props.setArcana(characterToEdit.arcana)
        props.setAthletics(characterToEdit.athletics)
        props.setDeception(characterToEdit.deception)
        props.setHistory(characterToEdit.history)
        props.setInsight(characterToEdit.insight)
        props.setIntimidation(characterToEdit.intimidation)
        props.setInvestigation(characterToEdit.investigation)
        props.setMedicine(characterToEdit.medicine)
        props.setNature(characterToEdit.nature)
        props.setPerception(characterToEdit.perception)
        props.setPerformance(characterToEdit.performance)
        props.setPersuasion(characterToEdit.persuasion)
        props.setReligion(characterToEdit.religion)
        props.setSleightOfHand(characterToEdit.sleightOfHand)
        props.setStealth(characterToEdit.stealth)
        props.setSurvival(characterToEdit.survival)
        //props.setLan(characterToEdit.languages)
        //props.setOtherProficiencies(characterToEdit.otherProficiencies)
        //props.setFeatures(characterToEdit.features)
        //props.setWeapons(characterToEdit.weapons)
        props.setSpellCasting(characterToEdit.spellCastingAbility)
        //props.setSpells(characterToEdit.spells)
        props.setEquip(characterToEdit.equipment)
        props.setStorage(characterToEdit.storage)
        //props.setCopper(characterToEdit.coins.copper)
        //props.setSilver(characterToEdit.coins.silver)
        //props.setGold(characterToEdit.coins.gold)
        //props.setPlatinum(characterToEdit.coins.platinum)
        //props.setElectrum(characterToEdit.coins.electrum)
    }

    return(
        <div>
            <h2>Editing character {characterToEdit.name}</h2>
        </div>
    )
}

export default EditingCharacter