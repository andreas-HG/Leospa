import React, { useContext, useEffect, useState } from "react";

import { getAll, patch } from "../../../assets/scripts/apiCalls";
import Create from "./header/adminControls/hero/Create";
import Update from "./header/adminControls/hero/Update";
import { FiEdit, FiTrash2} from 'react-icons/fi'
import {VscNewFile} from 'react-icons/vsc'
import Delete from "./header/adminControls/hero/Delete";
import { shorten, stripMarkup } from "../../../assets/scripts/tools";
import { LoginContext } from "../../../context/LoginContext";
import { useHistory } from "react-router";

const HeroAdmin = () => {

const {loggedIn} = useContext(LoginContext)
const history = useHistory()

    const [heros, setHeros] = useState([]);

    const [heroId, setHeroId] = useState('')

    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [displayDelete, setDisplayDelete] = useState(false)
    const [displayCreate, setDisplayCreate] = useState(false)

    const getHeros = async () => {
        const heros = await getAll("hero");
        setHeros(heros);
    };
    useEffect(() => {
        getHeros()
    }, []);

    const changeActiveHero = async (e) => {
        const formData = new FormData()
        formData.append('show', true)
        await patch('hero', formData, e.target.value)
        getHeros()
    }
    

    const heroMap = heros.map((hero) => {
        let checked = hero.show ? 'checked' : undefined
        return (
            <tr key={Math.random()}>
                {/* <th scope="row">{hero._id}</th> */}
                <td><input type="radio" name="active" value={hero._id} checked={checked} title={!checked ? 'Click to active!' : undefined} onChange={changeActiveHero} /></td>
                <td>{hero.title1}</td>
                <td>{hero.title2}</td>
                <td title={stripMarkup(hero.content)} className="whitespace-pre">{shorten(stripMarkup(hero.content), 90)}</td>
                <td>
                    {hero.link}
                </td>
                <td className="text-center">
                    <button
                        onClick={() => {setHeroId(hero._id); setDisplayUpdate(true)}}
                        className="btn"
                        
                    >
                        <FiEdit />
                    </button>
                    /
                    <button
                        onClick={() => {setHeroId(hero._id); setDisplayDelete(true)}}
                        className="btn"
                    >
                        <FiTrash2 />
                    </button>
                </td>
            </tr>
        );
    });
    if (loggedIn && loggedIn[0] === true) return (
        <section id="admin">
            <article className="container overflow-auto mt-5 pt-5">
                <h1 className="m-4 text-center">Heros</h1>
                <table className="table table-hover table-striped align-middle shadow">
                    <thead>
                        <tr>
                            {/* <th scope="col">ID</th> */}
                            <th scope="col">Active</th>
                            <th scope="col">Title1</th>
                            <th scope="col">Title2</th>
                            <th scope="col">Content</th>
                            <th scope="col">Link</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="6">
                                <button
                                    className="btn btn-dark align-bottom m-auto d-block text-center"
                                    onClick={() => setDisplayCreate(true)}
                                >
                                    <VscNewFile />
                                    &nbsp;&nbsp;Add Hero
                                </button>
                            </td>
                        </tr>
                        {heroMap.reverse()}
                    </tbody>
                </table>
            </article>
            <Create displayCreate={displayCreate} setDisplayCreate={setDisplayCreate} getHeros={getHeros} />
            <Update id={heroId} displayUpdate={displayUpdate} setDisplayUpdate={setDisplayUpdate} getHeros={getHeros} />
            <Delete id={heroId} displayDelete={displayDelete} setDisplayDelete={setDisplayDelete} getHeros={getHeros} />
        </section>
    );
    else if (loggedIn && loggedIn[0] === false) {
        history.push('/login')
        return null
    } else {
        return <h1 style={{textAlign: 'center', marginTop: '40vh'}}>Loading...</h1>
    }
}

export default HeroAdmin
