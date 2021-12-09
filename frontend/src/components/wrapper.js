import React from "react"
import { Outlet } from "react-router-dom"

const Wrapper = () => {
    return(
        <div>
            <p>Something</p>
            <Outlet />
        </div>
    )
}

export default Wrapper