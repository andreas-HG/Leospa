import React from 'react'
import style from './Content.module.scss'

const Content = ({children}) => {
    return (
        <article className={style.content} >
            {children}
        </article>
    )
}

export default Content
