import React, { useState, useEffect } from "react"

import userService from './services/users'

function App() {
  const
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(usersList => {
      setUsers(usersList)
    })
  }, [])

  return (
    <div>
      <h1>DnD Web App</h1>
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
