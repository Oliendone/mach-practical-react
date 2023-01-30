import { Link } from "react-router-dom";

import ImageItem from "../ImageItem/ImageItem";
import StarsRating from "../StarsRating/StarsRating";

import s from "./MovieItem.module.sass";

export default function MovieItem({ title, image, link, rating }) {
  return (
    <Link to={`/movie/${link}`} className={s.box}>
      <div className={s.imageBox}>
        {image && <ImageItem source={image} alt={title} />}
      </div>
      <h2 className={s.title}>{title}</h2>
      {rating && <StarsRating rating={rating} />}
    </Link>
  );
}
