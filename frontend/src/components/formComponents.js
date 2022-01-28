import React, { useState } from "react"

export const CheckboxField = ({ title, label, value, setFunction }) => {
    // If value already set to true, show checked checkbox.
    if (value !== "0"){
        return(
            <div>
            <input type="checkbox" id={title} name={title}
            value={title} onChange={({target}) => setFunction("0")} checked/>
            <label htmlFor={title}>{label}</label>
        </div>
        )
    }

    // Else show unchecked checkbox.
    return(
        <div>
            <input type="checkbox" id={title} name={title}
            value={title} onChange={({ target }) => setFunction(target.value)} />
            <label htmlFor={title}>{label}</label>
        </div>
    )
}

export const AddItemToList = ({ listHeader, listValue, listSetFunction }) => {
    const [nameValue, nameSet] = useState("")
    const [descriptionValue, descriptionSet] = useState("")

    const addNew = (event) => {
        event.preventDefault()
        if (nameValue === ""){
            return
        }
        const newItem = {
            'name': nameValue,
            'description': descriptionValue
        }
        listSetFunction([...listValue, newItem])

        nameSet("")
        descriptionSet("")
    }

    return(
        <div>
            <p><b>{listHeader}</b></p>
                <NewFormField label="Name" type="text" value={nameValue} setFunction={nameSet} />
                <NewFormField label="Description" type="text" value={descriptionValue} setFunction={descriptionSet}/>
                <button onClick={addNew}>Add</button>

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

export const AddToSimpleList = ({ listHeader, label, listValue, listSetFunction }) => {
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
            <p><b>{listHeader}</b></p>
            <NewFormField label={label} type="Text" value={item} setFunction={setItem} />
            <button onClick={addNew}>Add</button>

            <p><b>Added:</b></p>
            {listValue.map(value =>
                <p key={value}>{value}</p>
                )}
        </div>
    )
}

export const DropDownList = ({ field, optionsList, listValue, listSetFunction, oneValue=false }) => {
    const [selected, setSelected] = useState("")

    const add = (event) => {
        event.preventDefault()
        if (selected === ""){
            return
        }

        const string = selected.split(",")
        const selectedId = string[0]
        const selectedName = string[1]
        listSetFunction([...listValue, {id: selectedId, name: selectedName}])

        setSelected("")
    }

    return(
        <div>
            <h5>{field}</h5>
            <select name={field} id={field} onChange={({ target }) => setSelected(target.value)}>
                {optionsList.map(optionValue =>
                    oneValue ? <option key={optionValue.id} value={[optionValue.id, optionValue.name]}>{optionValue.name}</option>
                    : <option key={optionValue.id} value={[optionValue.id, optionValue.name]}>{optionValue.name}: {optionValue.description}</option>
                )}
                <option>empty</option>
            </select>
            <button onClick={add}>Add</button>

            <p><b>Added:</b></p>
            {listValue.map(item =>
                <p key={item.id}>{item.name}</p>
                )}
        </div>
    )
}

export const NewFormField = ({ label, type, value, setFunction, ...args }) => {
    return(
        <div>
            <label>{label}: </label>
            <input type={type} value={value} name={label} onChange={({ target }) => setFunction(target.value)}
            min={args.min} max={args.max}/>
        </div>
    )
}