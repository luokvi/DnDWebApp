import React, { useState } from "react"

import { NewFormField } from "./formComponents"

const CreateUserForm = ({ string }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPwd, setRepeatPws] = useState("")

    console.log("IN signup form")
    console.log(string)
    const handleSubmit = async (event) => {
        event.preventDefault()


    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <NewFormField label="Username" value={username} setFunction={setUsername} />
                <NewFormField label="Password" value={password} setFunction={setPassword} />
                <NewFormField label="Repeat password" value={repeatPwd} setFunction={setRepeatPws} />

                <button type="submit">sign up</button>
            </form>
        </div>
    )
}

export default CreateUserForm