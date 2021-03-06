import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"

import userService from './services/users'
import CreationsService from './services/creations'

import LoginForm from './components/loginForm'
import CreateUserForm from "./components/signupForm"
import ProfilePage from "./components/myProfilePage"
import UserPage from './components/userPage'
import AllUsers from "./components/users"
import CharacterPage from "./components/characterPage"
import CharacterForm from "./components/characterForm"
import PartyCreationForm  from './components/partyForm'

function App() {
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")

  const navigate = useNavigate()

  const loginFunc = async (user, token) => {
    setToken(token)

    if(user !== ''){
      const profile = await userService.getUser(user, token)
      setUser(profile)

    } else{
      setUser('')
    }
  }

  if (user === ''){
    return(
      <div>
        <h1 className="frontPage">TTRPG Parties</h1>

        <div className="formHorPart">
          <LoginForm setFunction={loginFunc} user={user}/>
          <CreateUserForm />
        </div>
      </div>
    )
  }

  const handleCharacterSubmit = (newCharacter, isNew) => {
    if (isNew){
      CreationsService.createCharacter(newCharacter, token)
    } else {
      CreationsService.updateCharacter(newCharacter, token)
    }
    
  }

  return (
      <div>
        <h1 className="siteName">TTRPG Parties</h1>
        <LoginForm setFunction={loginFunc} user={user.id} loggedInAs={user.username}/>

        <Routes>
          
          <Route path="/myProfile" element={ <ProfilePage user={user} token={token} /> } />
          <Route path="/user/:id" element={ <UserPage user={user} token={token} /> } />
          <Route path="/user/all" element={ <AllUsers /> } />
          <Route path="/character/view/:characterId" element={ <CharacterPage token={token} /> } /> 
          <Route path="/character/:characterId" element={ <CharacterForm token={token} userId={user.id} handleSubmitToBackend={ handleCharacterSubmit } userCreations={user.creations} /> } />
          <Route path="/party/:partyId" element={ <PartyCreationForm token={token} userId={user.id} user={user} /> } />
        </Routes>
      </div>
  );
}

export default App
