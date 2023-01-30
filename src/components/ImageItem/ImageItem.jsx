import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./ImageItem.module.sass";

export default function ImageItem({ alt, source }) {
  return (
    <div className={s.imageWrapper}>
      <LazyLoadImage className={s.image} src={source} alt={`${alt} image`} />
    </div>
  );
}
