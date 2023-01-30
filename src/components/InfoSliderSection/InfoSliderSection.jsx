import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import CastItem from "../CastItem/CastItem";
import ArticleItem from "../ArticleItem/ArticleItem";
import MovieItem from "../MovieItem/MovieItem";

import s from "./InfoSliderSection.module.sass";
import "swiper/css";

export default function InfoSliderSection({
  articlesSlider,
  castSlider,
  link,
  title,
  data,
}) {
  return (
    <div className={s.section}>
      <div className={s.headerBox}>
        <h2 className={s.title}>{title}</h2>
        {link && !castSlider && !articlesSlider && (
          <Link className={s.link} to={`/movie/category/${link}`}>
            Explore All
          </Link>
        )}
      </div>
      {data && (
        <Swiper spaceBetween={10} slidesPerView="auto">
          {data.map((item) => (
            <SwiperSlide key={item.id} className={s.swiperSlide}>
              {castSlider && (
                <CastItem
                  castName={item.name}
                  image={item.image}
                  characterName={item.character}
                />
              )}
              {!castSlider && !articlesSlider && (
                <MovieItem
                  title={item.title}
                  link={item.id}
                  image={item.image}
                  rating={item.rating}
                />
              )}
              {articlesSlider && (
                <ArticleItem
                  title={item.title}
                  link={item.url.toLowerCase()}
                  uid={item.system.uid}
                  image={item.imageConnection.edges[0].node.url}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="slider"></div>
    </div>
  );
}
