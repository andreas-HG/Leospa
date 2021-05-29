import React from "react";
import style from "./NewsLetter.module.scss";
import { FaRegEnvelope } from "react-icons/fa";
import { create } from "../../../assets/scripts/apiCalls";

const NewsLetter = ({newsletter, setNewsletter}) => {

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await create('newssubscription', e.target)
        alert('Congratulations! You have signed up for our newsletter :-)')
        setNewsletter(newsletter => !newsletter)
    } catch (err) {
        console.log({err})
        alert('A problem has ocurred while signing you up. Please try again :-)')
    }

}

  return (
    // <article className={style.newsletter} title="Sign up for newsletter!" >
    <>
      <article className={style.newsletterBtn} onClick={() => setNewsletter(newsletter => !newsletter)} >
        <FaRegEnvelope />
      </article>
      <article className={[style.signup, newsletter ? style.showSignup : undefined].join(' ')}>
        <form onSubmit={handleSubmit} >
          <h2>Sign up for Newsletter</h2>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" required/>
          <br />
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" placeholder="E-mail" required/>
          <br />
          <button type="submit">Sign up!</button>
          <button type="reset" onClick={() => setNewsletter(newsletter => !newsletter)} className={style.cancel} >Cancel</button>
        </form>
      </article>
    </>
    // </article>
  );
};

export default NewsLetter;
