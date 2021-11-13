import React, { useState, useEffect } from "react"
import loginService from '../services/login'

const LoginForm = ({ setFunction, user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [notifText, setNotif] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            const response = await loginService.loginUser(username, password)
            
            setFunction(response.username)
            setUsername('')
            setPassword('')
            setNotif('')
        } catch { 
            // if couldn't find user
            setNotif('Incorrect username or password')
            setPassword('')
        }
    }

    if ( user === ""){
        return(
            <div>
                <form onSubmit={handleLogin}>
                    <p>{notifText}</p>
                    <div>username
                        <input id="username" type="text" value={username} name="Username" required onChange={({ target }) => setUsername(target.value)}/>
                    </div>
                    <div>password
                        <input id="password" type="password" value={password} name="Password" required onChange={({ target }) => setPassword(target.value)}/>
                    </div>
                    <button id="login-button" type="submit">login</button>
                </form>
            </div>
        )
    }

    return(
        <div>
            <p>Logged in as {user}</p>
        </div>
    )
    
}

export default LoginForm