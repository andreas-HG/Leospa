import React, { useEffect } from "react";
import { useState } from "react";
import {getAll, updateSingle } from "../../../assets/scripts/apiCalls";

const FooterAdmin = () => {

    // const [footer, setFooter] = useState();
    const [name, setName] = useState("");
    const [cvr, setCvr] = useState('')
    const [address, setAddress] = useState('')
    const [zipncity, setZipncity] = useState('')
    const [phone, setPhone] = useState('initialState')
    const [email, setEmail] = useState('')
    const [openinghours, setOpeninghours] = useState('')

    const getFooter = async () => {
        const footer = await getAll("footer");

        setName(footer.name);
        setCvr(footer.cvr);
        setAddress(footer.address)
        setZipncity(footer.zipncity)
        setPhone(footer.phone)
        setEmail(footer.email)
        setOpeninghours(footer.openinghours)
    };

    useEffect(() => {
        getFooter()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSingle("footer", e.target)
            getFooter()
        } catch (err) {
            console.log({message: 'An error has ocurred!', err})
        }
        
    };

    return (
        <section className="container-sm mt-5 pt-5">
            <h1 className="my-5">Edit Footer</h1>
            <form onSubmit={handleSubmit}>
                        <article className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="cvr" className="form-label">
                                CVR
                            </label>
                            <input
                                type="text"
                                name="cvr"
                                value={cvr}
                                onChange={(e) => {
                                    setCvr(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="zipncity" className="form-label">
                                ZIP-code and city
                            </label>
                            <input
                                type="text"
                                name="zipncity"
                                value={zipncity}
                                onChange={(e) => {
                                    setZipncity(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required
                                className="form-control"
                            />
                        </article>

                        <article className="mb-3">
                            <label htmlFor="openinghours" className="form-label">
                                Opning Hours
                            </label>
                            <input
                                type="text"
                                name="openinghours"
                                value={openinghours}
                                onChange={(e) => {
                                    setOpeninghours(e.target.value);
                                }}
                                required
                                className="form-control"
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

export default FooterAdmin
