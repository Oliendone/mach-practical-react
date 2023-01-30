import { useMemo } from "react";

import MovieItem from "../MovieItem/MovieItem";

import s from "./MoviesByCategory.module.sass";

export default function MoviesByCategory({
  header,
  movies,
  searchPage,
  loadMoreMovies,
}) {
  const setHeader = searchPage ? `Results For: ${header}` : header;

  const moviesItems = movies?.map((movie) => (
    <MovieItem
      key={movie.id}
      title={movie.title}
      link={movie.id}
      image={movie.image}
      rating={movie.rating}
    />
  ));

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{setHeader}</h1>
      {movies && (
        <>
          <div className={s.items}>{moviesItems}</div>
          <button className={s.button} onClick={loadMoreMovies}>
            Load More
          </button>
        </>
      )}
    </div>
  );
}
