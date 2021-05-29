import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { LoginContext } from '../../context/LoginContext'

const LoginCheck = ({children}) => {
    const {loggedIn} = useContext(LoginContext)
    const history = useHistory()

    useEffect(() => {
        console.log({loggedIn})
        
        // if (loggedIn && loggedIn[0] === true) history.push("/admin/treatments")
        if (loggedIn && loggedIn[0] === false) history.push("/login")
    }, [loggedIn])




    return (
        <>
            {children}
        </>
    )
}

export default LoginCheck
