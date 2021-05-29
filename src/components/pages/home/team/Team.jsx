import React, { useState } from "react";
import { useEffect } from "react";

import { getAll, SERVER } from "../../../../assets/scripts/apiCalls";
import Content from "../../../layout/content/Content";
import Title from "../../../layout/title/Title";
import style from "./Team.module.scss";
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from 'react-icons/fa'

const Team = () => {
  const [team, setTeam] = useState([]);

  const getTeam = async () => {
    setTeam(await getAll("team"));
  };

  useEffect(() => {
    getTeam();
  }, []);

  const teamMap = team.map((teamMember) => {
    // if (teamMember)
      return (
        <article className={style.teamMember} key={Math.random()} >
          <article
            className={style.img}
            style={{
              backgroundImage: `url('${SERVER}/images/team/${teamMember.image}')`,
            }}
          ></article>
          <article className={style.nameTag}>
            <h3>{`${teamMember.firstname} ${teamMember.lastname}`}</h3>
            <p>{teamMember.role}</p>
          <article className={style.soMe} ><a href="http://facebook.com" rel="noreferrer" target="_blank"><FaFacebookF /></a><a href="http://twitter.com" rel="noreferrer" target="_blank"><FaTwitter /></a><a href="http://google.com" rel="noreferrer" target="_blank"><FaGooglePlusG /></a><a href="http://instagram.com" rel="noreferrer" target="_blank"><FaInstagram /></a></article>
          </article>
        </article>
      );
  });

  return (
    <section className={style.team}>
      <Content>
        <Title>
          <h2>Experienced Team</h2>
          <p>
            Aut harum explicabo delectus. Dolores et aut ut et omnis dolor et
            porro. Molestiae qui molestiae dignissimos voluptas. Expedita
            doloribus ab magni quibusdam sunt ut perspiciatis totam. Consequatur
            laboriosam aut. Delectus molestiae sit soluta at et velit ut
            laudantium dolorum.
          </p>
        </Title>
        <article className={style.teamGrid}>{teamMap}</article>
      </Content>
    </section>
  );
};

export default Team;
