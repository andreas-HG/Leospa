import React from 'react'
import { NavLink } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import style from './Nav.module.scss'

const Nav = ({className, setShowNav}) => {
    return (
        <nav className={style.nav} >
            <ul className={className} >
                <li>
                    <NavLink to="/" onClick={() => setShowNav(false)} >HOME</NavLink>
                </li>
                <li>
                    <HashLink to="/#about" onClick={() => setShowNav(false)} >ABOUT</HashLink>
                </li>
                <li>
                    <NavLink to="/events" onClick={() => setShowNav(false)} >EVENTS</NavLink>
                </li>
                <li>
                    <NavLink to="/treatments" onClick={() => setShowNav(false)} >TREATMENTS</NavLink>
                </li>
                <li>
                    <HashLink to="/#booking" onClick={() => setShowNav(false)} >CONTACT</HashLink>
                </li>
            </ul>
        </nav>
    )
}


export default Nav
