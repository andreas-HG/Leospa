import React, { createContext, useEffect, useState } from 'react'
import { loggedIn as checkLoggedIn } from '../assets/scripts/apiCalls'

export const LoginContext = createContext()

const LoginContextProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState()

    const checkLogin = async () => {
        const res = await checkLoggedIn()
        res.status === 200 ? setLoggedIn([true, res.data.user]) : setLoggedIn([false])
    }

    useEffect(() => {
        checkLogin()
    }, [])



    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, checkLogin }} >
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider
