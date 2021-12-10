import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"

import userService from './services/users'
import LoginForm from './components/loginForm'
import ProfilePage from "./components/myProfilePage"
import CharacterCreation from "./components/characterCreationForm"


function App() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    // Check if user in LocalStorage.
    const loggedUser = localStorage.getItem('user')
    const loggedToken = localStorage.getItem('token')

    if (loggedUser && loggedToken){
      setLoggedInUser(loggedUser.id)
      setUser(loggedUser)
      setToken(loggedToken)
    }
  }, [])
  const navigate = useNavigate()

  const loginFunc = async (userid, token) => {
    setLoggedInUser(userid)
    setToken(token)

    if(userid !== ''){
      const profile = await userService.getUser(userid)
      setUser(profile)
      navigate('/myProfile')

      // Save user and token in LocalStorage.
      localStorage.setItem('user', profile)
      localStorage.setItem('token', token)

    } else{
      setUser('')
    }
  }

  if (loggedInUser === ''){
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

        <Routes>
          <Route path="/myProfile" element={<ProfilePage user={user} token={token} />} />
          <Route path="/createCharacter" element={ <CharacterCreation userId={user.id} token={token} /> } />
        </Routes>
      </div>
  );
}

export default App
