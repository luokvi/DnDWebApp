import React, { useState } from "react"

import createService from '../services/creations'

import { CheckboxField, NewFormField } from './formComponents'

const ItemCreationForm = ({ userId, token }) => {
    const [equipNameValue, equipNameSet] = useState("")
    const [equipDescriptionValue, equipDescriptionSet] = useState("")

    const [spellNameValue, spellNameSet] = useState("")
    const [spellDescriptionValue, spellDescriptionSet] = useState("")
    const [spellLevel, levelSet] = useState("")
    const [castingTime, castingTimeSet] = useState("")
    const [spellRangeValue, spellRangeSet] = useState("")
    const [verbal, verbalSet] = useState("0")
    const [somatic, somaticSet] = useState("0")
    const [material, materialSet] = useState("0")
    let components = []
    const [minutesValue, minutesSet] = useState("")
    const [isConcentrationValue, concentrationSet] = useState("0")

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

        creations.push(created)
        
        // Empty form.
        equipNameSet("")
        equipDescriptionSet("")
    }

    const createSpell = async (event) => {
        event.preventDefault()

        if (verbal !== "0") components.push("Verbal")
        if (somatic !== "0") components.push("Somatic")
        if (material !== "0") components.push("Material")

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

        creations.push(created)

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

        creations.push(created)

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
                <NewFormField label="Name" type="text" value={equipNameValue} setFunction={equipNameSet} />
                <NewFormField label="Description" type="text" value={equipDescriptionValue} setFunction={equipDescriptionSet} />
                <button type="Submit">Create</button>
            </form>

            <form onSubmit={createSpell}>
                <h4>Create new Spell</h4>
                <NewFormField label="Name" type="text" value={spellNameValue} setFunction={spellNameSet} />
                <NewFormField label="Description" type="text" value={spellDescriptionValue} setFunction={spellDescriptionSet} />
                <NewFormField label="Level" type="number" value={spellLevel} setFunction={levelSet} min="0" />
                <NewFormField label="Casting Time" type="text" value={castingTime} setFunction={castingTimeSet} />
                <NewFormField label="Spell Range" type="number" value={spellRangeValue} setFunction={spellRangeSet} min="0" />
                
                <div>
                    <h5>Needed components</h5>
                    <CheckboxField title="Verbal" label="Verbal" value={verbal} setFunction={verbalSet} />
                    <CheckboxField title="Somatic" label="Somatic" value={somatic} setFunction={somaticSet} />
                    <CheckboxField title="Material" label="Material" value={material} setFunction={materialSet} />
                </div>
                
                <NewFormField label="Duration, minutes" type="number" value={minutesValue} setFunction={minutesSet} min="0" />
                <CheckboxField title="concentration" label="Is Concentration" value={isConcentrationValue} setFunction={concentrationSet} />
                
                <button type="Submit">Create</button>
            </form>

            <form onSubmit={createWeapon}>
                <h4>Create new Weapon</h4>
                <NewFormField label="Name" type="text" value={weaponNameValue} setFunction={weaponNameSet} />
                <NewFormField label="Description" type="text" value={weaponDescriptionValue} setFunction={weaponDescriptionSet} />
                <NewFormField label="Attack Bonus" type="number" value={atkValue} setFunction={atkSet} min="0" />
                <NewFormField label="Damage Type" type="text" value={damageValue} setFunction={damageSet} />
                <NewFormField label="Attack Range" type="number" value={weaponRangeValue} setFunction={weaponRangeSet} min="0" />
                <button type="Submit">Create</button>
            </form>

            <div>
                <h4>Created items:</h4>
                {creations.map(item =>
                    <div key={item.id}>
                        <h5>{item.name}</h5>
                        <p>{item.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ItemCreationForm