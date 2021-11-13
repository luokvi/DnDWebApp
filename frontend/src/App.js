import React, { useState, useEffect } from "react"

import userService from './services/users'
import LoginForm from './components/loginForm'

function App() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [token, setToken] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(usersList => {
      setUsers(usersList)
    })
  }, [])

  const loginFunc = (userid, token) => {
    setLoggedInUser(userid)
    setToken(token)
  }

  return (
    <div>
      <h1>DnD Web App</h1>
      <LoginForm setFunction={loginFunc} user={loggedInUser}/>
      <h3>Users:</h3>
      <ul>
        {users.map(user => 
          <li key={user.id}>{user.username}</li>
          )}
      </ul>
    </div>
  );
}

export default App
