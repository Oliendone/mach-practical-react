import ImageItem from "../ImageItem/ImageItem";

import s from "./CastItem.module.sass";

export default function CastItem({ castName, image, characterName }) {
  return (
    <div className={s.castItem}>
      <div className={s.imageBox}>
        {image && <ImageItem source={image} alt={castName} />}
      </div>
      <div className={s.title}>{castName}</div>
      <div className={s.subtitle}>{characterName}</div>
    </div>
  );
}
