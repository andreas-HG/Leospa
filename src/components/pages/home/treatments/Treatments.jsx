import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, SERVER } from "../../../../assets/scripts/apiCalls";
import { shorten } from "../../../../assets/scripts/tools";
import style from "./Treatments.module.scss";
import parse from "html-react-parser";
import { useMediaQuery } from "react-responsive";
import Title from "../../../layout/title/Title";
import Content from "../../../layout/content/Content";
import OverlayImg from "../../../../assets/gfx/1.png";

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [bigFour, setBigFour] = useState([]);
  const [smallThree, setSmallThree] = useState([]);

  const xs = useMediaQuery({ query: "(min-width: 450px)" });
  const sm = useMediaQuery({ query: "(min-width: 600px)" });
  const lg = useMediaQuery({ query: "(min-width: 900px)" });

  const getTreatments = async () => {
    setTreatments(await getAll("treatment"));
  };

  const sortTreatments = () => {
    const treatmentSlice = treatments.slice();
    setBigFour([]);

    let rows = 1;

    xs && (rows = 2);
    sm && (rows = 3);
    lg && (rows = 4);

    for (let i = 0; i < rows; i++) {
      setBigFour((bigFour) => [
        ...bigFour,
        treatmentSlice.splice(
          Math.floor(Math.random() * treatmentSlice.length),
          1
        )[0],
      ]);
    }

    setSmallThree(treatmentSlice.slice(0, 3));
  };

  useEffect(() => {
    getTreatments();
  }, [xs, sm, lg]);

  useEffect(() => {
    sortTreatments();
  }, [treatments]);

  const bigFourMap = bigFour.map((treatment) => {
    if (treatment)
      return (
        <article key={Math.random()} className={style.treatmentContainer}>
          <article
            className={style.treatment}
            style={{
              backgroundImage: `url('${SERVER}/images/treatment/${treatment.image}')`,
            }}
            key={Math.random()}
          ></article>
          <Link
            to={`/treatments?t=${treatment.title}`}
            className={style.overlay}
          >
            <article className={style.overlayImg}>
              <img src={OverlayImg} alt="" />
              <h3>{treatment.title}</h3>
            </article>
          </Link>
        </article>
      );
  });

  const smallThreeMap = smallThree.map((treatment) => {
    if (treatment)
      return (
        <article className={style.treatment} key={Math.random()}>
          <article
            className={style.img}
            style={{
              backgroundImage: `url('${SERVER}/images/treatment/${treatment.image}')`,
            }}
          ></article>
          <h3>{treatment.title}</h3>
          {parse(shorten(treatment.content, 90))}
          <Link to={`/treatments?t=${treatment.title}`}>READ MORE</Link>
          <br />
          <br />
        </article>
      );
  });

  return (
    <section className={style.treatments}>
      <article className={style.bigFour}>{bigFourMap}</article>
      <Content>
        <Title>
          <h2>Popular Treatments</h2>
          <p>
            Sit hic eaque officiis quam repudiandae. Omnis nemo autem similique
            aut quam. Qui doloremque consequatur corporis aut aut. Voluptatem
            facere dicta harum.
          </p>
        </Title>
        <article className={style.smallThree}>{smallThreeMap}</article>
      </Content>
    </section>
  );
};

export default Treatments;
