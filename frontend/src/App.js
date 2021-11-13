import React, { useState, useEffect } from "react"

import userService from './services/users'
import LoginForm from './components/loginForm'
import ProfilePage from "./components/myProfilePage"

function App() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    
  }, [])

  const loginFunc = async (userid, token) => {
    setLoggedInUser(userid)
    setToken(token)

    if(userid !== ''){
      const profile = await userService.getUser(userid)
      setUser(profile)
    } else{
      setUser('')
    }
  }

  if (loggedInUser == ''){
    return(
      <div>
        <h1>DnD Web App</h1>
        <LoginForm setFunction={loginFunc} user={loggedInUser}/>
      </div>
    )
  }

  return (
    <div>
      <h1>DnD Web App</h1>
      <LoginForm setFunction={loginFunc} user={loggedInUser}/>
      <ProfilePage user={user} />
    </div>
  );
}

export default App
