import { Link } from "react-router-dom";

import s from "./ArticleItem.module.sass";

export default function ArticleItem({ image, title, link, uid }) {
  return (
    <Link to={`/article/${uid}/${link}`} className={s.articleItem}>
      <div className={s.imageBox}>
        <img src={image} alt={`${title} poster`} className={s.image} />
      </div>
      <h3 className={s.title}>{title}</h3>
    </Link>
  );
}
