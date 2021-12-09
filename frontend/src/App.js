import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from "react-router-dom"

import userService from './services/users'
import LoginForm from './components/loginForm'
import ProfilePage from "./components/myProfilePage"
import Wrapper from "./components/wrapper"
import UserPage from "./components/userPage"

const getUser = async(id) => {
  const user = await userService.getUser(id)

  return user
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [token, setToken] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    
  }, [])
  const navigate = useNavigate()

  const loginFunc = async (userid, token) => {
    setLoggedInUser(userid)
    setToken(token)

    if(userid !== ''){
      const profile = await getUser(userid)
      setUser(profile)
      navigate('/myProfile')
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
            <Route path="/user/" element={<Wrapper />}>
              <Route path=":userId" element={<UserPage getUserFunction = {getUser}/>}/>
          </Route>
        </Routes>
      </div>
  );
}

export default App
