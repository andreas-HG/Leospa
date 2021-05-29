
import { useHistory } from 'react-router'
import { useContext, useEffect } from 'react'
import { logout } from '../../assets/scripts/apiCalls'
import { LoginContext } from '../../context/LoginContext'

const LogOut = () => {

    const {checkLogin} = useContext(LoginContext)

    const history = useHistory()

    const logOut = async () => {
        await logout()
        checkLogin()
        history.push('/')
    }

    useEffect(() => {
        logOut()
    }, [])

    return null
}

export default LogOut
