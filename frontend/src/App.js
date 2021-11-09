import React, { useState, useEffect } from "react"

import userService from './services/users'
import LoginForm from './components/loginForm'

function App() {
  const [loggedInUser, setLoggedInUsers] = useState("")
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(usersList => {
      setUsers(usersList)
    })
  }, [])

  return (
    <div>
      <h1>DnD Web App</h1>
      <LoginForm setFunction={setLoggedInUsers} user={loggedInUser}/>
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
