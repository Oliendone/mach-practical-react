import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import { MoviesService } from "../../services/MoviesService";

import MoviesByCategory from "../../components/MoviesByCategory/MoviesByCategory";

import s from "./SearchPage.module.sass";

export default function SearchPage() {
  const moviesService = new MoviesService();

  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [header, setHeader] = useState("");
  const location = useRef(useLocation().state);

  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    if (searchQuery !== "") {
      setHeader(searchQuery);
      loadMovies();
    } else {
      setMovies(null);
      navigate(location.current);
    }

    return () => {
      isCancelled = true;
    };
  }, [searchParams]);

  useEffect(() => {
    if (page !== 1) {
      loadMoreMovies();
    }
  }, [page]);

  function setNextPage() {
    setPage((prevState) => prevState + 1);
  }

  function loadMovies() {
    moviesService.getSearchedMovies(searchQuery, "en-us", page).then((data) => {
      setMovies(data);
    });
  }

  function loadMoreMovies() {
    moviesService.getSearchedMovies(searchQuery, "en-us", page).then((data) => {
      setMovies((prevState) => {
        return [...prevState, ...data];
      });
    });
  }

  return (
    <main className={s.searchPage}>
      {movies && (
        <MoviesByCategory
          header={header}
          movies={movies}
          searchPage={true}
          loadMoreMovies={setNextPage}
        />
      )}
    </main>
  );
}
