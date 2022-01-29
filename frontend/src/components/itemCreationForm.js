import React, { useState } from "react"

import createService from '../services/creations'

import { CheckboxField, NewFormField } from './formComponents'

export const EquipmentCreationForm = ({ userId, token, equipList, setEquipList }) => {
    const [equipNameValue, equipNameSet] = useState("")
    const [equipDescriptionValue, equipDescriptionSet] = useState("")
    const [creations, setCreations] = useState([])

    const createEquip = async (event) => {
        event.preventDefault()

        const newEquip = {
            "name": equipNameValue,
            "description": equipDescriptionValue,
            "itemType": "Equipment",
            "userId": userId
        }
        const created = await createService.createItem(newEquip, token)

        setCreations([...creations, created])
        setEquipList([...equipList ,created])
        
        // Empty form.
        equipNameSet("")
        equipDescriptionSet("")
    }

    return(
        <div>
            <form onSubmit={createEquip}>
                <h4>Create new Equipment</h4>
                <NewFormField label="Name" type="text" value={equipNameValue} setFunction={equipNameSet} required/>
                <NewFormField label="Description" type="text" value={equipDescriptionValue} setFunction={equipDescriptionSet} required/>
                <button type="Submit">Create</button>
            </form>

            <p><b>Created equipment:</b></p>
            {creations.map(e => 
                <p key={e.id}>
                    <i>{e.name}</i>: {e.description}
                </p>
            )}
        </div>
    )

}

export const SpellCreationForm = ({ userId, token, spellsList, setSpellsList }) => {
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
    const [creations, setCreations] = useState([])

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

        setCreations([...creations, created])
        setSpellsList([...spellsList, created])

        // Empty form.
        spellNameSet("")
        spellDescriptionSet("")
        levelSet("")
        castingTimeSet("")
        spellRangeSet("")
        components = []
        verbalSet("0")
        somaticSet("0")
        materialSet("0")
        minutesSet("")
        concentrationSet("0")
    }

    return(
        <div>
            <form onSubmit={createSpell}>
                <h4>Create new Spell</h4>
                <NewFormField label="Name" type="text" value={spellNameValue} setFunction={spellNameSet} required/>
                <NewFormField label="Description" type="text" value={spellDescriptionValue} setFunction={spellDescriptionSet} required/>
                <NewFormField label="Level" type="number" value={spellLevel} setFunction={levelSet} min="0" required/>
                <NewFormField label="Casting Time" type="text" value={castingTime} setFunction={castingTimeSet} required/>
                <NewFormField label="Spell Range" type="number" value={spellRangeValue} setFunction={spellRangeSet} min="0" required/>
                
                <div>
                    <h5>Needed components</h5>
                    <CheckboxField title="Verbal" label="Verbal" value={verbal} setFunction={verbalSet} />
                    <CheckboxField title="Somatic" label="Somatic" value={somatic} setFunction={somaticSet} />
                    <CheckboxField title="Material" label="Material" value={material} setFunction={materialSet} />
                </div>
                
                <NewFormField label="Duration, minutes" type="number" value={minutesValue} setFunction={minutesSet} min="0" required/>
                <CheckboxField title="concentration" label="Is Concentration" value={isConcentrationValue} setFunction={concentrationSet} required/>
                
                <button type="Submit">Create</button>
            </form>

            <p><b>Created spells:</b></p>
            {creations.map(s => 
                <p key={s.id}>
                    <i>{s.name}</i>: {s.description}
                </p>
            )}
        </div>
    )
}

export const WeaponCreationForm = ({ userId, token, weaponsList, setWeaponsList }) => {
    const [weaponNameValue, weaponNameSet] = useState("")
    const [weaponDescriptionValue, weaponDescriptionSet] = useState("")
    const [atkValue, atkSet] = useState("")
    const [damageValue, damageSet] = useState("")
    const [weaponRangeValue, weaponRangeSet] = useState("")
    const [creations, setCreations] = useState([])

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

        setCreations([...creations, created])
        setWeaponsList([...weaponsList, created])

        // Empty form.
        weaponNameSet("")
        weaponDescriptionSet("")
        atkSet("")
        damageSet("")
        weaponRangeSet("")
    }

    return(
        <div>
            <form onSubmit={createWeapon}>
                <h4>Create new Weapon</h4>
                <NewFormField label="Name" type="text" value={weaponNameValue} setFunction={weaponNameSet} required/>
                <NewFormField label="Description" type="text" value={weaponDescriptionValue} setFunction={weaponDescriptionSet} required/>
                <NewFormField label="Attack Bonus" type="number" value={atkValue} setFunction={atkSet} min="0" required/>
                <NewFormField label="Damage and Type" type="text" value={damageValue} setFunction={damageSet} required/>
                <NewFormField label="Attack Range" type="number" value={weaponRangeValue} setFunction={weaponRangeSet} min="0" required/>
                <button type="Submit">Create</button>
            </form>

            <p><b>Created weapons:</b></p>
            {creations.map(w => 
                <p key={w.id}>
                    <i>{w.name}</i>: {w.description}
                </p>
            )}
        </div>
    )
}