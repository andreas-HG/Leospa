import React, { useEffect, useState } from "react";
import style from "./Testimonials.module.scss";
import SlickSlider from "react-slick";
import { getAll, SERVER } from "../../../../assets/scripts/apiCalls";
import Quote from '../../../../assets/gfx/quote.png'
import '../../../../../node_modules/slick-carousel/slick/slick.scss'
import '../../../../../node_modules/slick-carousel/slick/slick-theme.scss'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = async () => {
    setTestimonials(await getAll("recommendation/antal/3"));
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const testimonialMap = testimonials.map((testimonial) => {
    return (
      <article key={Math.random()} >
        <article className={style.slide}>    
          <article className={style.slideContent} >
          <img src={Quote} alt="" className={style.quote} />
            <article className={style.content} >
                {testimonial.content}
            </article>
            <img className={style.img} src={`${SERVER}/images/recommendation/${testimonial.image}`} alt="" />
            <p className={style.name} >
                {testimonial.name}, <span>{testimonial.title}</span>
            </p>
          </article>
        </article>
      </article>
    );
  });

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    slide: "article",
    className: style.slide,
    pauseOnHover: false,
    dotsClass: ['slick-dots', style.dots].join(' '),
    // arrows: false
  };

  return <SlickSlider {...settings}>
      {testimonialMap}
  </SlickSlider>;
};

export default Testimonials;
