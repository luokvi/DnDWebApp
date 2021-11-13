import React, { useState, useEffect } from "react"
import loginService from '../services/login'

const LoginForm = ({ setFunction, user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await loginService.loginUser(username, password)

        setFunction(response.username)
        
        setUsername('')
        setPassword('')
    }

    if ( user === ""){
        return(
            <div>
                <form onSubmit={handleLogin}>
                    <div>username
                        <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
                    </div>
                    <div>password
                        <input id="password" type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
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