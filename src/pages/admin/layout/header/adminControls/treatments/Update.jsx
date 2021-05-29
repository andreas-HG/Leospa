import React, { useEffect } from "react";
import { useState } from "react";
import { SERVER, getById, update } from "../../../../../../assets/scripts/apiCalls";
import ImageUploader from "react-images-upload";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const Update = ({ id, displayUpdate, setDisplayUpdate, getTreatments }) => {
    // const [treatment, setTreatment] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState();

    useEffect(() => {
        if (!id) return
        const getTreatment = async () => {
            const treatment = await getById("treatment", id);
            // setTreatment(treatment);
            setTitle(treatment.title);
            setDescription(treatment.content);
            setImg(treatment.image);
        };
        getTreatment()
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        update("treatment", e.target, id)
        .then(() => {
            getTreatments()
            setDisplayUpdate(false)
        })
    };


    return (
        <section
            id="update"
            className="modal"
            tab-index="-1"
            aria-hidden={!displayUpdate}
            style={{
                display: displayUpdate === true ? 'block' : 'none',
                // maxHeight: '80vh',
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
                        <article className="mb-3">
                            {/* <label htmlFor="img" className="form-label">
                                Billede
                            </label>
                            <input name="treatmentImg" required type="file" className="form-control" /> */}
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                name="image"
                                imgExtensions={[".jpg", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                                defaultImages={[
                                    img && SERVER + "/images/treatment/" + img,
                                ]}
                                singleImage={true}
                            />
                        </article>
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline">
                                Save
                            </button>
                            <button
                                className="btn w-100 m-2 btn-danger display-inline"
                                onClick={(e) => {e.preventDefault(); setDisplayUpdate(false)}}
                            >
                                Cancel
                            </button>
                        </article>
                    </form>
                </article>
            </article>
        </section>
    );
};

export default Update;