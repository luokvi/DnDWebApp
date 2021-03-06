import React, { useState } from "react"

import userService from '../services/users'
import { NewFormField } from "./formComponents"

const CreateUserForm = ({ }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPwd, setRepeatPws] = useState("")
    const [notif, setNotif] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (username === "" || password === "" || repeatPwd === ""){
            setNotif("Username and password required.")
            return
        }
        // Check that username is atleast 5 chatacters long.
        if ( username.length < 5){
            setNotif("Username should be atleast 5 characters long.")
            return
        }
        // Check that password is atleast 8 characters long.
        if (password.length < 8){
            setNotif("Password should be atleast 8 characters long.")
            setPassword("")
            setRepeatPws("")
            return
        }
        // Check that passwords match.
        if (password !== repeatPwd){
            setPassword("")
            setRepeatPws("")
            setNotif("Passwords should match.")
            return
        }
        setNotif("")

        const newUser = {
            username: username,
            password: password
        }

        const savedUser = await userService.createUser(newUser)

        setNotif("Created new user " + savedUser.username)

        setUsername("")
        setPassword("")
        setRepeatPws("")
    }
    return(
        <div>
            <h3>Sign up</h3>
            <form onSubmit={handleSubmit}>
                <NewFormField label="Username" value={username} setFunction={setUsername} required />
                <NewFormField label="Password" type="password" value={password} setFunction={setPassword} required />
                <NewFormField label="Repeat password" type="password" value={repeatPwd} setFunction={setRepeatPws} required />
                <p>{notif}</p>

                <button type="submit">sign up</button>
            </form>
        </div>
    )
}

export default CreateUserForm