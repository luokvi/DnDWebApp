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

    return(
        <div>
            <form>
                <h5>Create new Weapon</h5>
                <FormField id="wName" title="Name" value={itemNameValue} setFunction={itemNameSet} />
                <FormField id="wDesc" title="Description" value={itemDescriptionValue} setFunction={itemDescriptionSet}/>
                <FormField id="weaponAtk" title="ATK Bonus" value={atkValue} setFunction={atkSet} type="Number" />
                <FormField id="weaponDmg" title="Damage Type" value={damageValue} setFunction={damageSet} />
                <FormField id="weaponRange" title="Range" value={rangeValue} setFunction={rangeSet} type="Number" />
                <button onClick={createNewItem}>create</button>
            </form>

            <form>
                <h5>Create new Equipment</h5>  
                <FormField id="eName" title="Name" value={itemNameValue} setFunction={itemNameSet} />
                <FormField id="eDesc" title="Description" value={itemDescriptionValue} setFunction={itemDescriptionSet}/>
                <button onClick={createNewItem}>create</button>
            </form>

            <form>
                <h5>Create new Spell</h5>
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
            </form>
        </div>
    )
}

export default ItemCreationForm