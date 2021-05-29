import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../assets/scripts/apiCalls'
import { LoginContext } from '../../context/LoginContext'

const Login = () => {


    const history = useHistory()
    const [message, setMessage] = useState()
    const {loggedIn, setLoggedIn, checkLogin} = useContext(LoginContext)


    useEffect(() => {
        
        if (loggedIn && loggedIn[0] === true) history.push("/admin/treatments")
    }, [loggedIn])

    const handleLogin = async (e) => {
        e.preventDefault()

        login(e.target).then(res => {

            // console.log(res)
            if (res !== false) {
                checkLogin()
                history.push('/admin/treatments')
            } else {
                setLoggedIn(false)
                setMessage('Login mislykkedes')}

        })
    }
    return (
        <section id="login" className="container my-5">
            LOGIN!
            <form onSubmit={(e) => handleLogin(e)}>
                <article className="form-group mb-3">
                    <label htmlFor="email" className="form-label">E-mail:</label>
                    <input type="email" name="email" className="form-control" required/>
                </article>
                <article className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" name="password" className="form-control" required/>
                </article>
                <button type="submit" className="btn btn-primary">Log ind</button>
            </form>
            <h3>
                {message}
            </h3>
        </section>
    )
}

export default Login
