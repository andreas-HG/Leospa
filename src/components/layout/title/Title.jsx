import React from 'react'
import style from './Title.module.scss'

const Title = ({children, wide}) => {
    return (
        <article className={[style.title, wide ? style.wide : undefined].join(' ')} >
            {children}
        </article>
    )
}

export default Title
