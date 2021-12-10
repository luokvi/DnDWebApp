import React, { useState, useEffect } from "react"
import loginService from '../services/login'
import userService from '../services/users'

const LoginForm = ({ setFunction, user, loggedInAs }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [notifText, setNotif] = useState('')

    // Check localStorage for user.
    useEffect(() => {
        if ( user === ''){
            const storedUser = localStorage.getItem('user')
            const storedToken = localStorage.getItem('token')

            console.log("Got from storage: " + storedUser + ", and token: " + storedToken)
            if (storedUser !== null){
                const parsedUser = JSON.parse(storedUser)
                setFunction(parsedUser.id, storedToken)
            }
        }
      }, [setFunction, user])

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            // Login
            const response = await loginService.loginUser(username, password)
            // Get user
            const user = await userService.getUser(response.userid)
            
            // Set user and token to LocalStorage
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', response.token)

            setFunction(response.userid, response.token)

            setPassword('')
            setNotif('')
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

    console.log("User is: " + user)
    if ( !user ){
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
            <p>Logged in as {loggedInAs}</p>
            <button id="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )
    
}

export default LoginForm