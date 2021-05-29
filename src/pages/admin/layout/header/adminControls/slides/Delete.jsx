import React from 'react'
import { Redirect } from 'react-router-dom';
import { useGlobal } from 'reactn';
import { deleteOne } from '../../../../../../helpers/apiCalls';

const Delete = ({id}) => {
    const [authorized, setAuthorized] = useGlobal('loggedIn')
    const handleDelete = async () => {
        if (!authorized) return <Redirect to="/login" />;
        deleteOne('slides', id).then(() => window.location.reload())
        
    }
    return (
        <section
            id="delete"
            className="modal fade"
            tab-index="-1"
            aria-hidden="true"
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4">
                        <article className="mb3">
                            <h4>Er du sikker på, at du ønsker at slette dette slide?</h4>
                        </article>
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline"
                                onClick={handleDelete}    
                            >
                                Slet
                            </button>
                            <button
                                className="btn w-100 m-2 btn-danger display-inline"
                                onClick={(e) => e.preventDefault()}
                                data-dismiss="modal"
                                // data-target="#update"
                            >
                                Fortryd
                            </button>
                        </article>
                    
                </article>
            </article>
        </section>
    );
}

export default Delete
