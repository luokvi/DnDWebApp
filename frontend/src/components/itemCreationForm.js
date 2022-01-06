import React, { useState } from "react"

import createService from '../services/creations'

import { CheckboxField, FormField } from './formComponents'

// TODO: separate function for adding different types of items??
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
    const [components, componentsSet] = useState([])
    const [minutesValue, minutesSet] = useState("")
    const [isConcentrationValue, concentrationSet] = useState("")

    const [itemNameValue, itemNameSet] = useState("")
    const [itemDescriptionValue, itemDescriptionSet] = useState("")
    const [atkValue, atkSet] = useState("")
    const [damageValue, damageSet] = useState("")
    const [weaponRangeValue, weaponRangeSet] = useState("")

    const createEquip = async () => {
        const newEquip = {
            "name": equipNameValue,
            "description": equipDescriptionValue,
            "itemType": "Equipment",
            "userId": userId
        }
        const created = await createService.createItem(newEquip, token)

        console.log(created)
    }

    return(
        <div>
            <form onSubmit={createEquip}>
                <FormField id="EquipmentName" title="Name" type="text" value={equipNameValue} setFunction={equipNameSet} />
                <FormField id="EquipmentDesc" title="Description" type="text" value={equipDescriptionValue} setFunction={equipDescriptionSet} />
                <button type="Submit">Create</button>
            </form>
        </div>
    )
}

export default ItemCreationForm