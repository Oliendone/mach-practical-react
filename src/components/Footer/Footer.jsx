import { Link } from "react-router-dom";

import { getProperMovieLink } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { MOVIES_MENU_QUERY } from "../../queries/movies-menu";

import s from "./Footer.module.sass";

export default function Footer() {
  const { data } = useQuery(MOVIES_MENU_QUERY, {
    variables: {
      uid: "bltfaf26acf86ea7588",
      locale: "en-us",
    },
  });

  const menuLinks = data?.menu_movies.menu_items.map((item, index) => (
    <Link
      to={getProperMovieLink(item.internal_linkConnection.edges[0].node.url)}
      key={index}
      className={s.link}
    >
      {item.label.toUpperCase()}
    </Link>
  ));

  return (
    <footer className={s.footer}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <Link to="/" className={s.link}>
            MOVIE BASE
          </Link>
          {menuLinks}
        </div>
        <div className={s.afterText}>Created by Nikita Lavrenyuk</div>
      </div>
    </footer>
  );
}
