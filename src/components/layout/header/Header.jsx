import React, { useState } from 'react'
import style from './Header.module.scss'
import Nav from './nav/Nav'
import Logo from '../../../assets/gfx/logo.png'
import { useHistory, useLocation } from 'react-router'
import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import {FaBars} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
    const [headerStyle, setHeaderStyle] = useState()
    const [showNav, setShowNav] = useState(false)

    const history = useHistory()
    const location = useLocation()

    const md = useMediaQuery({query: '(min-width: 750px)'})

    useEffect(() => {
        if (history.location.pathname === "/") {
            setHeaderStyle(style.headerHome)
        } else {
            setHeaderStyle(style.header)
        }
        if (!md) setHeaderStyle(style.headerSmall)
    }, [location, md])




    return (
        <header className={headerStyle} >
            <Link to="/"><img src={Logo} alt="" /></Link>
            <Nav className={!!showNav ? style.show : undefined} setShowNav={setShowNav} />
            <button className={style.navBtn} onClick={() => setShowNav(showNav => !showNav)}>
                <FaBars />
            </button>
        </header>
    )
}

export default Header
