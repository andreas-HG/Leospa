import React, { useState } from "react";
import Content from "../../components/layout/content/Content";
import Title from "../../components/layout/title/Title";
import style from "./Events.module.scss";
import Salad from "../../assets/img/laughingatsalad.jpg";
import Horse from "../../assets/img/kræsen-hest2.jpg";
import { shorten } from "../../assets/scripts/tools";
import parse from 'html-react-parser'
import { useEffect } from "react";

const Events = () => {

  const [expanded, setExpanded] = useState()

  useEffect(() => {
    console.log(expanded)
  }, [expanded])

  const events = [
    {
      title: "Laughing at Salad",
      content: `<p>Did you know, that laughing at salad can rejuvenate your explicabo ipsam maiores mollitia omnis magni doloribus voluptas. Non et dolorem rerum ea iste qui labore. Velit delectus et libero aut omnis sed laudantium adipisci molestiae. Ab commodi nihil tenetur consequatur officiis voluptatum soluta pariatur et. Deserunt ut ex mollitia consectetur.
        Quo molestias reprehenderit quos qui est corporis. Accusamus cum sed. Sed labore quaerat non et quia temporibus aliquam ipsam. Unde repellat est quis dolores. Quia qui quia. Laudantium adipisci omnis voluptas omnis maxime quam eos.
        </p>
        <br />
        <p>
        Velit fugit aut ipsam ut et atque omnis illo. Rerum qui non ut vel quia animi animi dolorem. Voluptatum ducimus voluptas ea.
        </p>
        <br />
        <p>
        Quo autem magnam quia aut. Minima nam qui molestiae nobis. Et reprehenderit hic iure assumenda. Sit id vel commodi rerum. Mollitia nemo vero consectetur nisi alias rerum molestias. Error nihil amet repellat omnis ut et.
        </p>`,
        
      image: Salad,
    },
    {
      title: "Sunday Horse Lick",
      content: `A horses tongue has over 5.000.000 voluptatem eum qui ratione debitis et. Iste velit perspiciatis. Minus velit suscipit velit. A deserunt quia similique quam eum.
        Every Sunday we bring a new horse to the spa for our traditional nobis fuga consequatur culpa quos quis. Nihil quis pariatur. Fugiat ut blanditiis. Ut aliquid vel totam neque ex sit ratione.`,
      image: Horse,
    },
  ];

  const expand = (i) => {
    expanded === i ? setExpanded() : setExpanded(i)
  }

  const eventMap = events.map((event, i) => {
    return (
    <article className={style.event} key={Math.random()}>
        <article className={style.img} style={{backgroundImage: `url('${event.image}')`}} title={event.title} ></article>
        <article className={style.eventContent} >
        <h3>{event.title}</h3>
        <p onClick={() => expand(i)} title={expanded === i ? 'See less...' : 'See more...'} >{parse(shorten(event.content, expanded === i ? 0 : 120))}</p>
        </article>
    </article>
    
    );
  });

  return (
    <section className={style.events}>
      <Content>
        <Title>
          <h1>Events</h1>
          <p>
            Neque cumque tenetur error earum deleniti. Minima hic blanditiis
            minus. Et suscipit vel reprehenderit rerum eos nisi. Natus inventore
            voluptatibus aut. Nemo sint quas.
          </p>
        </Title>
        <article className={style.eventGrid} >
            {eventMap}
        </article>
      </Content>
    </section>
  );
};

export default Events;
