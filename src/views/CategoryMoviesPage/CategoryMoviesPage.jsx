import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MoviesService } from "../../services/MoviesService";

import MoviesByCategory from "../../components/MoviesByCategory/MoviesByCategory";

import s from "./CategoryMoviesPage.module.sass";

export default function CategoryMoviesPage() {
  const moviesService = new MoviesService();

  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [header, setHeader] = useState("");

  const { category } = useParams();

  function setNextPage() {
    setPage((prevState) => prevState + 1);
  }

  function loadMoreMovies() {
    switch (category) {
      case "popular":
        moviesService.getTrendingMovies("en-us", page).then((data) => {
          if (movies) {
            setMovies((prevState) => [...prevState, ...data]);
          }
        });
        break;
      case "top_rated":
        moviesService.getTopRatedMovies("en-us", page).then((data) => {
          if (movies) {
            setMovies((prevState) => [...prevState, ...data]);
          }
        });
        break;
      case "upcoming":
        moviesService.getUpcomingMovies("en-us", page).then((data) => {
          if (movies) {
            setMovies((prevState) => [...prevState, ...data]);
          }
        });
        break;
      case "now_playing":
        moviesService.getNowPlayingMovies("en-us", page).then((data) => {
          if (movies) {
            setMovies((prevState) => [...prevState, ...data]);
          }
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      loadMoreMovies();
    }

    return () => {
      isCancelled = true;
    };
  }, [page]);

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      switch (category) {
        case "popular":
          moviesService.getTrendingMovies("en-us", page).then((data) => {
            setMovies(data);
          });
          setHeader("Popular Movies");
          break;
        case "top_rated":
          moviesService.getTopRatedMovies("en-us", page).then((data) => {
            setMovies(data);
          });
          setHeader("Top Rated Movies");
          break;
        case "upcoming":
          moviesService.getUpcomingMovies("en-us", page).then((data) => {
            setMovies(data);
          });
          setHeader("Upcoming Movies");
          break;
        case "now_playing":
          moviesService.getNowPlayingMovies("en-us", page).then((data) => {
            setMovies(data);
          });
          setHeader("Now Playing Movies");
          break;
        default:
          break;
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [category]);

  return (
    <main className={s.movieCategory}>
      {movies && (
        <MoviesByCategory
          header={header}
          movies={movies}
          loadMoreMovies={setNextPage}
        />
      )}
    </main>
  );
}
