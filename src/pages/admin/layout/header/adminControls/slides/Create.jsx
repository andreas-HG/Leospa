import React from 'react'
import { create } from '../../../../../../helpers/apiCalls'
import ImageUploader from 'react-images-upload'
import { useState } from 'reactn'

const Create = () => {

    const [checked, setChecked] = useState(true)

    const handleSubmit = async e => {
        e.preventDefault()
        create('slides', e.target)
        .then(res => console.log(res))
        .then(() => window.location.reload())
    }
    
    return (
        <section
            id="upload"
            className="modal fade"
            tab-index="-1"
            aria-hidden="true"
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4">
                    <form onSubmit={handleSubmit}>
                        <h3>Nyt slide</h3>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Titel
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="form-control"
                            />
                        </article>
                        <article className="mb-3">
                            <label htmlFor="text" className="form-label">
                                Text
                            </label>
                            <textarea
                                required
                                name="text"
                                id=""
                                cols="30"
                                rows="10"
                                className="form-control"
                            ></textarea>
                        </article>
                        <article className="mb-3 form-check form-switch">
                            <input
                                type="checkbox"
                                name="active"
                                required
                                // checked
                                defaultChecked={checked}
                                className="form-check-input"
                                onChange={e => setChecked(e.target.defaultChecked)}
                            />
                            <label htmlFor="active" className="form-check-label ml-1">
                                Aktiv
                            </label>
                        </article>
                        <article className="mb-3">
                            {/* <label htmlFor="img" className="form-label">
                                Billede
                            </label>
                            <input name="slideImg" required type="file" className="form-control" /> */}
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                name="slideImg"
                                imgExtensions={[".jpg", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        </article>
                        <button className="btn btn-success mr-2 display-inline">
                            Tilføj
                        </button>
                        <button
                            className="btn btn-danger mr-2 display-inline"
                            onClick={(e) => e.preventDefault()}
                            data-dismiss="modal"
                            // data-target="#update"
                        >
                            Fortryd
                        </button>
                    </form>
                </article>
            </article>
        </section>
    );
}

export default Create
