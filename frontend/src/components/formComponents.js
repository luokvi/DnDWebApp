import React, { useState } from "react"

export const FormField = ({ id, title, type, value, setFunction }) => {
    return(
        <div>
            {title}: 
            <input id={id} type={type} value={value} name={title}
            onChange={({ target }) => setFunction(target.value)}/>
        </div>
    )
}

export const CheckboxField = ({ title, setFunction }) => {
    return(
        <div>
            <input type="checkbox" id={title} name={title}
            value={title} onChange={({ target }) => setFunction(target.value)}/>
            <label htmlFor={title}>{title}</label>
        </div>
    )
}

export const AddItemToList = ({ field, listValue, listSetFunction }) => {
    const [nameValue, nameSet] = useState("")
    const [descriptionValue, descriptionSet] = useState("")

    const addNew = (event) => {
        event.preventDefault()
        if (nameValue === ""){
            return
        }
        const newItem = {
            'name': nameValue,
            'desciption': descriptionValue
        }
        listSetFunction([...listValue, newItem])

        nameSet("")
        descriptionSet("")
    }

    return(
        <div>
            <h5>{field}</h5>
                <FormField id="itemName" title="Name" value={nameValue} setFunction={nameSet} />
                <FormField id="itemDesc" title="Description" value={descriptionValue} setFunction={descriptionSet}/>
                <button onClick={addNew}>add</button>

            <p><b>Added:</b></p>
            {listValue.map(value =>
                <div key={value.name}>
                    <p><b>Name:</b> {value.name} </p>
                    <p><b>Description:</b> {value.desciption}</p>
                </div>
            )}
        </div>
    )
}

export const AddToSimpleList = ({ field, listValue, listSetFunction }) => {
    const [item, setItem] = useState("")

    const addNew = (event) => {
        event.preventDefault()
        if(item === ""){
            return
        }

        listSetFunction([...listValue, item])

        setItem("")
    }

    return(
        <div>
            <FormField id={field} title={field} value={item} setFunction={setItem}/>
            <button onClick={addNew}>add</button>

            <p><b>Added:</b></p>
            {listValue.map(value =>
                <p key={value}>{value}</p>
                )}
        </div>
    )
}

export const DropDownList = ({ field, optionsList, listValue, listSetFunction, newItemFunction, itemType }) => {
    const [nameValue, nameSet] = useState("")
    const [descriptionValue, descriptionSet] = useState("")
    const [spellLevel, levelSet] = useState("")
    const [castingTime, castingTimeSet] = useState("")
    const [rangeValue, rangeSet] = useState("")
    const [componentsValue, componentsSet] = useState([""])
    const [minutesValue, minutesSet] = useState("")
    const [isConcentrationValue, concentrationSet] = useState("")
    const [atkValue, atkSet] = useState("")
    const [damageValue, damageSet] = useState("")

    const [selected, setSelected] = useState("")
    const [addedItemNames, setItemNames] = useState([])

    const add = (event) => {
        event.preventDefault()
        if (selected === ""){
            return
        }
        console.log("selected: " + selected)
        const string = selected.split(",")
        const selectedId = string[0]
        const selectedName = string[1]
        listSetFunction([...listValue, selectedId])
        setItemNames([...addedItemNames, selectedName])

        setSelected("")
    }

    const createNew = async (event) => {
        event.preventDefault()

        // Add to backend.
        const newItem = {
            "itemType": itemType,
            "name": nameValue,
            "description": descriptionValue
        }

        const createdItem = await newItemFunction(newItem)

        if (createdItem !== undefined){
            // Add created item to list.
            listSetFunction([...listValue, createdItem.id])
            setItemNames([...addedItemNames, createdItem.name])

            nameSet("")
            descriptionSet("")
        }
        else {
            //TODO: set notification that an error occured.
        }
    }

    const CreateNewForm = ({ type }) => {
        switch (type){
            case "Equipment":
                return(
                    <div>
                        <FormField id="itemName" title="Name" value={nameValue} setFunction={nameSet} />
                        <FormField id="itemDesc" title="Description" value={descriptionValue} setFunction={descriptionSet}/>
                    </div>
                )
            case "Weapon":
                return(
                    <div>
                        <FormField id="itemName" title="Name" value={nameValue} setFunction={nameSet} />
                        <FormField id="itemDesc" title="Description" value={descriptionValue} setFunction={descriptionSet}/>
                        <FormField id="weaponAtk" title="ATK Bonus" value={atkValue} setFunction={atkSet} type="Number" />
                        <FormField id="weaponDmg" title="Damage Type" value={damageValue} setFunction={damageSet} />
                        <FormField id="weaponRange" title="Range" value={rangeValue} setFunction={rangeSet} type="Number" />
                    </div>
                )
            case "Spell":
                return(
                    <div>
                        <FormField id="itemName" title="Name" value={nameValue} setFunction={nameSet} />
                        <FormField id="itemDesc" title="Description" value={descriptionValue} setFunction={descriptionSet}/>
                        <FormField id="spellLevel" title="Level" value={spellLevel} setFunction={levelSet} type="Number" />
                        <FormField id="spellCasting" title="Casting Time" value={castingTime} setFunction={castingTimeSet} />
                        <div>
                            <p>Spell Duration</p>
                            <FormField id="spellMinutes" title="Duration, minutes" value={minutesValue} setFunction={minutesSet} type="Number" />
                            <CheckboxField title={"Is Concentration"} setFunction={concentrationSet}/>
                        </div>
                    </div>
                )
            default:
                return(
                    <div>
                      <p>something is wrong...</p>
                    </div>
                )
        }

    }

    return(
        <div>
            <h5>{field}</h5>
            <select name={field} id={field} onChange={({ target }) => setSelected(target.value)}>
                {optionsList.map(optionValue =>
                    <option key={optionValue.id} value={[optionValue.id, optionValue.name]}>{optionValue.name}</option>
                )}
                <option>empty</option>
            </select>
            <button onClick={add}>Add</button>

            <div>
                <p><b>Create new:</b></p>
                    <CreateNewForm type={itemType} />
                <button onClick={createNew}>create</button>
            </div>

            <p><b>Added:</b></p>
            {addedItemNames.map(value =>
                <p key={value}>{value}</p>
                )}
        </div>
    )
}