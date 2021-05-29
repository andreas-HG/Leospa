import React, { useEffect, useState } from 'react'
import style from './Footer.module.scss'
import Logo from '../../../assets/gfx/logo.png'
import Nav from '../header/nav/Nav'
import { FaFacebookF, FaInstagram, FaTwitter, FaVimeoV } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getAll } from '../../../assets/scripts/apiCalls'

const Footer = () => {

    const [footer, setFooter] = useState()

    const getFooter = async () => {
        setFooter(await getAll('footer'))
    }

    useEffect(() => {
        getFooter()
    }, [])

    const contactInfo = () => {
        if (footer) return (
            <article className={style.contactInfo} >
                <p>
                    {footer.name} | {footer.address}, {footer.zipncity}
                    </p>
                <p>
                    Tel: {footer.phone} | CVR: {footer.cvr}
                </p>
                <p>
                    Opening hours: {footer.openinghours}
                </p>
            </article>
        )
    }

    return (
        <footer className={style.footer} >
            <img src={Logo} alt="" />
            <Nav setShowNav={() => null} className={style.nav} />
            {contactInfo()}
            <article className={style.soMe} >
                <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a> | <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> | <a href="http://vimeo.com" target="_blank" rel="noopener noreferrer"><FaVimeoV /></a> | <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </article>
            <p className={style.copyright} >&copy; COPYRIGHT 2019 <Link to="/">THEMEIES.COM</Link>. ALL RIGHTS RESERVED.</p>
            <Link to="/admin" className={style.adminLink} >ADMIN</Link>
        </footer>
    )
}

export default Footer
