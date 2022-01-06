import React, { useState } from "react"

import createService from '../services/creations'

import { CheckboxField, FormField } from './formComponents'

// TODO: separate function for adding different types of items??
const ItemCreationForm = ({ userId, token }) => {
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

    return(
        <di>
            
        </di>
    )
}

export default ItemCreationForm