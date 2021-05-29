import React, { useEffect } from "react";
import { useState } from "react";
import {getAll, updateSingle } from "../../../assets/scripts/apiCalls";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AboutAdmin = () => {

    // const [about, setAbout] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getAbout = async () => {
        const about = await getAll("about");

        setTitle(about.title);
        setDescription(about.content);
    };

    useEffect(() => {
        getAbout()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSingle("about", e.target)
            getAbout()
        } catch (err) {
            console.log({message: 'An error has ocurred!', err})
        }
        
    };

    return (
        <section className="container-sm mt-5 pt-5">
            <h1 className="my-5">Edit About-section</h1>
            <form onSubmit={handleSubmit}>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
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
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline">
                                Save
                            </button>
                            
                        </article>
                    </form>
        </section>
    )
}

export default AboutAdmin
