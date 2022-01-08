import React, { useState } from "react"

import createService from '../services/creations'

import { CheckboxField, FormField } from './formComponents'

const ItemCreationForm = ({ userId, token }) => {
    const [equipNameValue, equipNameSet] = useState("")
    const [equipDescriptionValue, equipDescriptionSet] = useState("")

    const [spellNameValue, spellNameSet] = useState("")
    const [spellDescriptionValue, spellDescriptionSet] = useState("")
    const [spellLevel, levelSet] = useState("")
    const [castingTime, castingTimeSet] = useState("")
    const [spellRangeValue, spellRangeSet] = useState("")
    const [verbal, verbalSet] = useState("")
    const [somatic, somaticSet] = useState("")
    const [material, materialSet] = useState("")
    let components = []
    const [minutesValue, minutesSet] = useState("")
    const [isConcentrationValue, concentrationSet] = useState("")

    const [weaponNameValue, weaponNameSet] = useState("")
    const [weaponDescriptionValue, weaponDescriptionSet] = useState("")
    const [atkValue, atkSet] = useState("")
    const [damageValue, damageSet] = useState("")
    const [weaponRangeValue, weaponRangeSet] = useState("")

    const [creations, creationsSet] = useState([])

    const createEquip = async (event) => {
        event.preventDefault()

        const newEquip = {
            "name": equipNameValue,
            "description": equipDescriptionValue,
            "itemType": "Equipment",
            "userId": userId
        }
        const created = await createService.createItem(newEquip, token)

        creationsSet([...creations, created])
        // debug creations list
        console.log("Creations:")
        console.log(creations)

        // Empty form.
        equipNameSet("")
        equipDescriptionSet("")
    }

    const createSpell = async (event) => {
        event.preventDefault()

        if (verbal !== "") components.push("Verbal")
        if (somatic !== "") components.push("Somatic")
        if (material !== "") components.push("Material")

        console.log("Components: ")
        console.log(components)

        const newSpell = {
            "name": spellNameValue,
            "description": spellDescriptionValue,
            "level": spellLevel,
            "castingTime": castingTime,
            "range": spellRangeValue,
            "components": components,
            "duration": {
                "minutes": minutesValue,
                "isConcentration": (isConcentrationValue !== "" ? true : false)
            },
            "itemType": "Spell",
            "userId": userId
        }
        const created = await createService.createItem(newSpell, token)

        creationsSet(creations.push(created))

        // Empty form.
        spellNameSet("")
        spellDescriptionSet("")
        levelSet("")
        castingTimeSet("")
        spellRangeSet("")
        components = []
        minutesSet("")
        concentrationSet("")
    }

    const createWeapon = async (event) => {
        event.preventDefault()

        const newWeapon = {
            "name": weaponNameValue,
            "description": weaponDescriptionValue,
            "atkBonus": atkValue,
            "damage": damageValue,
            "range": weaponRangeValue,
            "itemType": "Weapon",
            "userId": userId
        }
        const created = await createService.createItem(newWeapon, token)

        creationsSet(creations.push(created))

        // Empty form.
        weaponNameSet("")
        weaponDescriptionSet("")
        atkSet("")
        damageSet("")
        weaponRangeSet("")
    }

    return(
        <div>
            <form onSubmit={createEquip}>
                <h4>Create new Equipment</h4>
                <FormField id="EquipmentName" title="Name" type="text" value={equipNameValue} setFunction={equipNameSet} />
                <FormField id="EquipmentDesc" title="Description" type="text" value={equipDescriptionValue} setFunction={equipDescriptionSet} />
                <button type="Submit">Create</button>
            </form>

            <form onSubmit={createSpell}>
                <h4>Create new Spell</h4>
                <FormField id="SpellName" title="Name" type="text" value={spellNameValue} setFunction={spellNameSet} />
                <FormField id="SpellDesc" title="Description" type="text" value={spellDescriptionValue} setFunction={spellDescriptionSet} />
                <FormField id="SpellLevel" title="Level" type="number" value={spellLevel} setFunction={levelSet} />
                <FormField id="CastingTime" title="Casting Time" type="text" value={castingTime} setFunction={castingTimeSet} />
                <FormField id="SpellRange" title="Range" type="number" value={spellRangeValue} setFunction={spellRangeSet} />
                <div>
                    <h5>Needed components</h5>
                    <CheckboxField title="Verbal" setFunction={verbalSet} />
                    <CheckboxField title="Somatic" setFunction={somaticSet} />
                    <CheckboxField title="Material" setFunction={materialSet} />
                </div>
                <FormField id="SpellDuration" title="Duration, minutes" type="number" value={minutesValue} setFunction={minutesSet} />
                <CheckboxField title="Is Concentration" setFunction={concentrationSet} />
                <button type="Submit">Create</button>
            </form>

            <form onSubmit={createWeapon}>
                <h4>Create new Weapon</h4>
                <FormField id="WeaponName" title="Name" type="text" value={weaponNameValue} setFunction={weaponNameSet} />
                <FormField id="WeaponDesc" title="Description" type="text" value={weaponDescriptionValue} setFunction={weaponDescriptionSet} />
                <FormField id="Atk" title="Attack Bonus" type="number" value={atkValue} setFunction={atkSet} />
                <FormField id="Damage" title="Damage Type" type="text" value={damageValue} setFunction={damageSet} />
                <FormField id="WeaponRange" title="Range" type="number" value={weaponRangeValue} setFunction={weaponRangeSet} />
                <button type="Submit">Create</button>
            </form>

            <div>
                <h4>Created items:</h4>
                {creations.map(item =>
                    <div>
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItemCreationForm