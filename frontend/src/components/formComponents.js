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

export const DropDownList = ({ field, optionsList, listValue, listSetFunction }) => {
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

    const CreateNewForm = ({ type }) => {
        switch (type){
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
            </div>

            <p><b>Added:</b></p>
            {addedItemNames.map(value =>
                <p key={value}>{value}</p>
                )}
        </div>
    )
}