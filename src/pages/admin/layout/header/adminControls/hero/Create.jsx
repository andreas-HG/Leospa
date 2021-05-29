import React, { useState } from 'react'
import { create } from '../../../../../../assets/scripts/apiCalls'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Create = ({displayCreate, setDisplayCreate, getTreatments}) => {

    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(new FormData(e.target))
        create('treatment/admin', e.target)
        .then(() => {
            getTreatments()
            setDisplayCreate(false)
        })

    }
    
    return (
        <section
            id="upload"
            className="modal"
            tab-index="-1"
            aria-hidden={!displayCreate}
            style={{
                display: displayCreate === true ? 'block' : 'none',
            }}
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4" style={{maxHeight: '80vh', overflowY: 'scroll'}}>
                    <form onSubmit={handleSubmit}>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title1
                            </label>
                            <input
                                type="text"
                                name="title1"
                                value={title1}
                                onChange={(e) => {
                                    setTitle1(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title2
                            </label>
                            <input
                                type="text"
                                name="title2"
                                value={title2}
                                onChange={(e) => {
                                    setTitle2(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>
                        <article className="mb-3" >
                            <label htmlFor="content" className="form-label">
                                Description
                            </label>
                            <textarea
                                required
                                name="content"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                style={{display: 'none'}}
                            ></textarea>
                            <CKEditor 
                            editor={ClassicEditor}
                            config={{
                                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList']
                            }}
                            data={description}
                            onReady={ editor => {
                                // editor.setData(description)
                                // You can store the "editor" and use when it is needed.
                                // console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data);
                            } }
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
                            } }
                             />
                        </article>
                        <article className="mb-3">
                            <label htmlFor="link" className="form-label">
                                Link
                            </label>
                            <input
                                type="text"
                                name="link"
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline">
                                Save
                            </button>
                            <button
                                className="btn w-100 m-2 btn-danger display-inline"
                                onClick={(e) => {e.preventDefault(); setDisplayCreate(false)}}
                            >
                                Cancel
                            </button>
                        </article>
                    </form>
                </article>
            </article>
        </section>
    );
}

export default Create
