import React from "react";
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { getAll } from "../../../../assets/scripts/apiCalls";
import style from "./Hero.module.scss";
import Leaf from "../../../../assets/gfx/leaf.png";
import Spa from "../../../../assets/gfx/spa.png";
import { IoIosArrowDropright } from "react-icons/io";

const Hero = () => {
  const [hero, setHero] = useState({
    title1: "",
    title2: "",
    content: "",
    link: "",
  });
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    showVideo &&
      setVideo(
        <article className={style.video}>
          <button onClick={() => setShowVideo((showVideo) => !showVideo)}>
            &times;
          </button>
          <iframe
            width="560"
            height="315"
            src={hero.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </article>
      );
    showVideo || setVideo()
  }, [showVideo]);

  useEffect(() => {
    console.log(showVideo);
  }, [showVideo]);

  const getHero = async () => {
    const res = await getAll("hero");

    const activeHero = res.filter((hero) => {
      return hero.show === true;
    });

    setHero(activeHero[0]);
  };

  useEffect(() => {
    getHero();
  }, []);

  return (
    <section className={style.hero}>
      <article className={style.heroGrid}>
        <article className={style.left}>
          <img src={Leaf} alt="" />
        </article>
        <article className={style.center}>
          <article className={style.centerContent}>
            <p className={style.pink}>{hero.title1.toUpperCase()}</p>
            <h1>{hero.title2}</h1>
            <p>{hero.content}</p>
            <HashLink to="#booking" smooth="true">
              RESERVE NOW
            </HashLink>
            <button onClick={() => setShowVideo((showVideo) => !showVideo)}>
              <IoIosArrowDropright />
              Watch our history
            </button>
          </article>
        </article>
        <article className={style.right}>
          <img src={Spa} alt="" />
        </article>
      </article>
      {video}
    </section>
  );
};

export default Hero;
