import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import userService from '../services/users'

const AllUsers = ({ }) => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const response = await userService.getAll()

        // Edit the dateCreated field.
        response.forEach(user => {
            const rawDate = user.dateCreated
            const dateParts = rawDate.split("T")
            const dateCreated = dateParts[0]
            user.dateCreated = dateCreated
        })

        setAllUsers(response)
    }

    if (allUsers === []){
        return(
            <div>
                <p>loading...</p>
            </div>
        )
    }

    return(
        <div>
            {allUsers.map(u => (
                <p key={u.id}>
                    <Link to={"/user/" + u.id}>
                        {u.username}
                    </Link>
                    , user since {u.dateCreated}
                </p>
            ))}
        </div>
    )
}

export default AllUsers