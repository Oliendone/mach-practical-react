import ImageItem from "../ImageItem/ImageItem";
import StarsRating from "../StarsRating/StarsRating";

import s from "./MovieHeroBanner.module.sass";

export default function MovieHeroBanner({ data }) {
  function getProperYear(data) {
    return data.split("-")[0];
  }

  return (
    <div className={s.hero}>
      {data && (
        <>
          <div className={s.content}>
            <div>
              <h1 className={s.title}>{data.title}</h1>
              <div className={s.meta}>
                <div className={s.rating}>
                  <StarsRating rating={data.rating} landingPage={true} />
                  <div>{data.votes} Reviews</div>
                </div>
                <div className={s.info}>
                  <span>{getProperYear(data.release)}</span>
                  <span>{data.runtime}</span>
                </div>
              </div>
              <div>{data.overview}</div>
            </div>
          </div>
          <div className={s.backdrop}>
            <ImageItem source={data.backdrop} alt={data.title} />
          </div>
        </>
      )}
    </div>
  );
}
