import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { deleteOne } from '../../../../../../assets/scripts/apiCalls';
import { LoginContext } from '../../../../../../context/LoginContext';

const Delete = ({id, displayDelete, setDisplayDelete, getTreatments}) => {
    const {loggedIn} = useContext(LoginContext)
    const handleDelete = async () => {
        console.log({id})
        if (loggedIn && loggedIn[0] === false) return <Redirect to="/login" />;
        deleteOne('treatment', id)
        .then(() => {
            getTreatments()
            setDisplayDelete(false)
        })
        
    }
    return (
        <section
            id="delete"
            className="modal"
            tab-index="-1"
            aria-hidden={!displayDelete}
            style={{display: displayDelete === true ? 'block' : 'none'}}
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4">
                        <article className="mb3">
                            <h4>Are you sure you wish to delete this treatment?</h4>
                        </article>
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline"
                                onClick={handleDelete}    
                            >
                                Delete
                            </button>
                            <button
                                className="btn w-100 m-2 btn-danger display-inline"
                                onClick={(e) => {e.preventDefault(); setDisplayDelete(false)}}
                            >
                                Cancel
                            </button>
                        </article>
                    
                </article>
            </article>
        </section>
    );
}

export default Delete
