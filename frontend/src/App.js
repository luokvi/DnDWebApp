import React, { useState, useEffect } from "react"

import userService from './services/users'
import LoginForm from './components/loginForm'
import ProfilePage from "./components/myProfilePage"

function App() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [token, setToken] = useState("")
  const [user, setUser] = useState([])

  useEffect(() => {
    userService.getUser(loggedInUser).then(user => {
      setUser(user)
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
      <ProfilePage userid={user} />
    </div>
  );
}

export default App
