import React, { useState } from "react";
import { useEffect } from "react";
import { create, getAll } from "../../../../assets/scripts/apiCalls";
import style from "./Booking.module.scss";
import Appointment from '../../../../assets/gfx/appointment-img.jpg'

const Booking = () => {
  const [treatments, setTreatments] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");

  const getTreatments = async () => {
    const treatments = await getAll("treatment");
    setTreatments(treatments);
    setTreatment(treatments[0]);
  };

  useEffect(() => {
    getTreatments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await create('appointment', e.target)
      console.log({res})
      alert('Your appointment has been booked!')
      setName('')
      setEmail('')
      setPhone('')
      setDate('')
      setTime('')
      setNotes('')
      setTreatment('')
      window.scrollTo(0, 0)
    } catch (err) {
      console.log({err})
      alert('An error seems to have occurred...')
    }
  }

  const treatmentMap = treatments.map((treatment) => {
    return <option value={treatment._id} key={Math.random()} >{treatment.title}</option>;
  });

  return (
    <section id="booking" className={style.booking}>
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset className={style.name}>
            <label htmlFor="name">NAME</label>
            <input
              required
              type="text"
              name="name"
              value={name}
              placeholder="NAME"
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className={style.email}>
            <label htmlFor="name">EMAIL ADDRESS</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              placeholder="EMAIL ADDRESS"
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className={style.phone}>
            <label htmlFor="name">PHONE NUMBER</label>
            <input
              required
              type="tel"
              name="phone"
              value={phone}
              placeholder="PHONE NUMBER"
              onChange={(e) => setPhone(e.target.value)}
            />
          </fieldset>
          <fieldset className={style.treatment}>
            <label htmlFor="treatment">SELECT TREATMENT</label>
            <select
              required
              name="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            >
              <option value="" >SELECT TREATMENT</option>
              {treatmentMap}
            </select>
          </fieldset>
          <fieldset className={style.date}>
            <label htmlFor="date">DATE</label>
            <input
              required
              type="date"
              name="date"
              value={date}
            //   placeholder="PHONE NUMBER"
              onChange={(e) => setDate(e.target.value)}
            />
          </fieldset>
          <fieldset className={style.time}>
            <label htmlFor="time">TIME</label>
            <input
              required
              type="time"
              name="time"
              value={time}
            //   placeholder="PHONE NUMBER"
              onChange={(e) => setTime(e.target.value)}
            />
          </fieldset>
          <fieldset className={style.notes} >
              <label htmlFor="notes">YOUR NOTES</label>
                  <textarea name="notes" rows="1" placeholder="YOUR NOTES" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
              
          </fieldset>
          <fieldset className={style.submit} >
              <button type="submit" >MAKE AN APPOINTMENT</button>
          </fieldset>
        </form>
      </main>
      <aside style={{backgroundImage: `url('${Appointment}')`}} ></aside>
    </section>
  );
};

export default Booking;
