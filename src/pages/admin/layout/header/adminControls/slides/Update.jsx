import React, { useEffect } from "react";
import { useState } from "reactn";
import { api, getById, update } from "../../../../../../helpers/apiCalls";
import ImageUploader from "react-images-upload";

const Update = ({ id }) => {
    // const [slide, setSlide] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [checked, setChecked] = useState()

    useEffect(() => {
        if (!id) return
        const getProduct = async () => {
            const slide = await getById("slides", id);
            // setSlide(slide);
            setTitle(slide.title);
            setDescription(slide.text);
            setImg(slide.slideImg);
            setChecked(slide.active)
            // console.log(slide.active)
        };
        getProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        update("slides", e.target, id).then(() => window.location.reload());
    };

    return (
        <section
            id="update"
            className="modal fade"
            tab-index="-1"
            aria-hidden="true"
        >
            <article className="modal-dialog modal-dialog-centered">
                <article className="modal-content p-4">
                    <form onSubmit={handleSubmit}>
                        <article className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Titel
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
                        <article className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Beskrivelse
                            </label>
                            <textarea
                                required
                                name="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                id=""
                                cols="30"
                                // rows="10"
                                className="form-control"
                            ></textarea>
                        </article>
                        <article className="mb-3 form-check form-switch">
                            <input
                                type="checkbox"
                                name="active"
                                // required
                                defaultChecked={checked}
                                className="form-check-input"
                                onChange={(e) => setChecked(e.target.defaultChecked)}
                            />
                            <label
                                htmlFor="active"
                                className="form-check-label ml-1"
                            >
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
                                defaultImages={[api.baseUrl + "/slides/" + img]}
                                singleImage={true}
                            />
                        </article>
                        <article className="m-3 d-sm-flex justify-content-between">
                            <button className="btn w-100 m-2 btn-success display-inline">
                                Gem
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
                    </form>
                </article>
            </article>
        </section>
    );
};

export default Update;
