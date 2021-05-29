import React, { useContext, useEffect, useState } from "react";

import { SERVER, getAll } from "../../../assets/scripts/apiCalls";
import Create from "./header/adminControls/treatments/Create";
import Update from "./header/adminControls/treatments/Update";
import { FiEdit, FiTrash2} from 'react-icons/fi'
import {VscNewFile} from 'react-icons/vsc'
import Delete from "./header/adminControls/treatments/Delete";
import { shorten, stripMarkup } from "../../../assets/scripts/tools";
import { LoginContext } from "../../../context/LoginContext";
import { useHistory } from "react-router";

const TreatmentsAdmin = () => {

const {loggedIn} = useContext(LoginContext)
const history = useHistory()

    const [treatments, setTreatments] = useState([]);

    const [treatmentId, setTreatmentId] = useState('')

    const [displayUpdate, setDisplayUpdate] = useState(false)
    const [displayDelete, setDisplayDelete] = useState(false)
    const [displayCreate, setDisplayCreate] = useState(false)

    const getTreatments = async () => {
        const treatments = await getAll("treatment");
        setTreatments(treatments);
    };
    useEffect(() => {
        getTreatments()
    }, []);

    

    const treatmentMap = treatments.map((treatment) => {
        return (
            <tr key={Math.random()}>
                {/* <th scope="row">{treatment._id}</th> */}
                <td>{treatment.title}</td>
                <td title={stripMarkup(treatment.content)} className="whitespace-pre">{shorten(stripMarkup(treatment.content), 90)}</td>
                <td>
                    <img src={`${SERVER}/images/treatment/${treatment.image}`} alt="" style={{height: '4rem'}} />
                </td>
                <td className="text-center">
                    <button
                        onClick={() => {setTreatmentId(treatment._id); setDisplayUpdate(true)}}
                        className="btn"
                        
                    >
                        <FiEdit />
                    </button>
                    /
                    <button
                        onClick={() => {setTreatmentId(treatment._id); setDisplayDelete(true)}}
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
                <h1 className="m-4 text-center">Treatments</h1>
                <table className="table table-hover table-striped align-middle shadow">
                    <thead>
                        <tr>
                            {/* <th scope="col">ID</th> */}
                            <th scope="col">Treatment</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">
                                <button
                                    className="btn btn-dark align-bottom m-auto d-block text-center"
                                    onClick={() => setDisplayCreate(true)}
                                >
                                    <VscNewFile />
                                    &nbsp;&nbsp;Add Treatment
                                </button>
                            </td>
                        </tr>
                        {treatmentMap.reverse()}
                    </tbody>
                </table>
            </article>
            <Create displayCreate={displayCreate} setDisplayCreate={setDisplayCreate} getTreatments={getTreatments} />
            <Update id={treatmentId} displayUpdate={displayUpdate} setDisplayUpdate={setDisplayUpdate} getTreatments={getTreatments} />
            <Delete id={treatmentId} displayDelete={displayDelete} setDisplayDelete={setDisplayDelete} getTreatments={getTreatments} />
        </section>
    );
    else if (loggedIn && loggedIn[0] === false) {
        history.push('/login')
        return null
    } else {
        return <h1 style={{textAlign: 'center', marginTop: '40vh'}}>Loading...</h1>
    }
}

export default TreatmentsAdmin
