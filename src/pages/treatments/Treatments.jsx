import React, { useEffect, useState } from "react";
import { getAll, SERVER } from "../../assets/scripts/apiCalls";
import { shorten, stripMarkup } from "../../assets/scripts/tools";
import Content from "../../components/layout/content/Content";
import Title from "../../components/layout/title/Title";
import style from "./Treatments.module.scss";
import parse from "html-react-parser";
import { useLocation } from "react-router";

const Treatments = ({match}) => {
  const [treatments, setTreatments] = useState([]);
  const [treatment, setTreatment] = useState();

  const location = useLocation()



  console.log({location})

  const getTreatments = async () => {
    setTreatments(await getAll("treatment"));
  };

  useEffect(() => {
    let req
    if (location.search) req = treatments.filter(treatment => {
      return treatment.title === location.search.replace('?t=', '')
    })
    req && setTreatment(req[0])

    // console.log(req[0])
  }, [treatments])

  useEffect(() => {
    getTreatments();
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    treatment
      ? (body.style.overflowY = "hidden")
      : (body.style.overflowY = "scroll");
  }, [treatment]);

  const treatmentMap = treatments.map((treatment) => {
    return (
      <article className={style.treatment} key={Math.random()}>
        <article
          className={style.img}
          style={{
            backgroundImage: `url('${SERVER}/images/treatment/${treatment.image}')`,
          }}
          title={treatment.title}
        ></article>
        <h3>{treatment.title}</h3>
        <p>{shorten(stripMarkup(treatment.content), 40)}</p>
        <button onClick={() => setTreatment(treatment)}>READ MORE</button>
      </article>
    );
  });

  return (
    <>
      <section
        className={[style.treatments, treatment ? style.blur : undefined].join(
          " "
        )}
      >
        <Content>
          <Title>
            <h1>Treatments</h1>
            <p>
              Nobis ducimus magni eum quod corrupti explicabo quasi expedita.
              Dolorem facilis error eligendi qui. At consequatur officia nostrum
              deserunt. Optio suscipit reprehenderit ipsum sed.
            </p>
          </Title>
          <article className={style.treatmentGrid}>{treatmentMap}</article>
        </Content>
      </section>
      <article>
        <article className={treatment ? style.overlay : undefined}></article>
        <article
          className={[
            style.detailsContainer,
            treatment ? style.showDetails : undefined,
          ].join(" ")}
        >
          <button onClick={() => setTreatment()}>&times;</button>
          <article className={style.details}>
            <Title>
              <h2>{treatment && treatment.title}</h2>
              <img
                src={`${SERVER}/images/treatment/${
                  treatment && treatment.image
                }`}
                alt=""
              />
            </Title>
            <article className={style.content}>
              {treatment && parse(treatment.content)}
            </article>
          </article>
        </article>
      </article>
    </>
  );
};

export default Treatments;
