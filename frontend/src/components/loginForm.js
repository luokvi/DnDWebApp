import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

import loginService from '../services/login'
import userService from '../services/users'

const LoginForm = ({ setFunction, user, loggedInAs }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [notifText, setNotif] = useState('')

    const navigate = useNavigate()
    
    // Check localStorage for user.
    useEffect(() => {
        checkStorage()
      }, [])

    const checkStorage = async () => {
        if ( user === ''){
            const storedUser = JSON.parse(localStorage.getItem('user'))
            const storedToken = localStorage.getItem('token')

            if (storedUser !== null){
                // See if token still valid.
                const response = await userService.getUser(storedUser.id, storedToken)
                try{
                    const id = response.id
                    setFunction(id, storedToken)
                } catch {
                    return
                }
            }
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            // Login
            const response = await loginService.loginUser(username, password)
            // Get user
            const user = await userService.getUser(response.userid, response.token)
            
            // Set user and token to LocalStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', response.token)

            setFunction(response.userid, response.token)

            setPassword('')
            setNotif('')

            // Move to myProfile page
            navigate('/myProfile')

        } catch { 
            // if couldn't find user
            setNotif('Incorrect username or password')
            setPassword('')
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        setFunction('', '')
        setUsername('')

        // Clear localStorage.
        localStorage.clear()
    }

    if ( !user ){
        return(
            <div>
                <h3>Sign in</h3>
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
            <p>Logged in as
                <Link to={"/myProfile"}>
                     {loggedInAs}
                </Link>
            </p>
            <button id="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )
    
}

export default LoginForm