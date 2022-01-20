import React, { useEffect,  } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"

import userService from '../services/users'

const UserPage = ({ user, token }) => {
    const { id } = useParams()

    const [gotUser, setUser] = useState("")

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const u = await userService.getUser(id)
        setUser(u)
    }

    return(
        <div>
            <h2>User {gotUser.name}</h2>
        </div>
    )
}

export default UserPage