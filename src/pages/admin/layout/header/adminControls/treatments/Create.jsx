import React, { useState } from 'react'
import { create } from '../../../../../../assets/scripts/apiCalls'
import ImageUploader from 'react-images-upload'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Create = ({displayCreate, setDisplayCreate, getTreatments}) => {

    const [description, setDescription] = useState('')

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
                maxHeight: '80vh',
            }}
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4" style={{maxHeight: '80vh', overflowY: 'scroll'}}>
                    <form onSubmit={handleSubmit}>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="form-control"
                            />
                        </article>
                        <article className="mb-3">
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
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setDescription(data);
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                             />
                        </article>
                        <article className="mb-3">
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                name="image"
                                imgExtensions={[".jpg", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        </article>
                        <button className="btn btn-success mr-2 display-inline">
                            Add
                        </button>
                        <button
                            className="btn btn-danger mr-2 display-inline"
                            onClick={(e) => {e.preventDefault(); setDisplayCreate(false)}}
                        >
                            Cancel
                        </button>
                    </form>
                </article>
            </article>
        </section>
    );
}

export default Create
