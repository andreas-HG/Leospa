import React, { useEffect, useState } from "react";
import { getAll } from "../../../../assets/scripts/apiCalls";
import style from "./About.module.scss";
import parse from 'html-react-parser'
import { Link } from "react-router-dom";
import Title from "../../../layout/title/Title";
import Content from "../../../layout/content/Content";
import Butterfly from '../../../../assets/gfx/butterfly.png'
import ChinaRose from '../../../../assets/gfx/china-rose.png'
import Jasmine from '../../../../assets/gfx/jasmine.png'

const About = () => {
  const [about, setAbout] = useState({title: '', content: ''});

  const getAbout = async () => {
      setAbout(await getAll('about'))
  }

  useEffect(() => {
      getAbout()
  }, [])


  return (
    <section id="about" className={style.about} >
      <Content>
      <img src={Butterfly} alt="" />
      <Title wide>
      <p className={style.preTitle} >ABOUT OUR SPA CENTER</p>
      <h2>
          {about.title}
      </h2>
          {parse(about.content)}
      </Title>
      <Link to="/events">READ MORE</Link>
      </Content>
      <img className={style.chinaRose} src={ChinaRose} alt="" />
      <img className={style.jasmine} src={Jasmine} alt="" />
    </section>
  );
};

export default About;
