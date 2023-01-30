import { useState, useEffect } from "react";

import { MoviesService } from "../../services/MoviesService";

import InfoSliderSection from "../../components/InfoSliderSection/InfoSliderSection";

import s from "./MoviesPage.module.sass";

export default function MoviesPage() {
  const moviesService = new MoviesService();

  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);

  useEffect(() => {
    moviesService.getTrendingMovies("en-us", 1).then((data) => {
      setPopularMovies(data);
    });
    moviesService.getTopRatedMovies("en-us", 1).then((data) => {
      setTopRatedMovies(data);
    });
    moviesService.getUpcomingMovies("en-us", 1).then((data) => {
      setUpcomingMovies(data);
    });
    moviesService.getNowPlayingMovies("en-us", 1).then((data) => {
      setNowPlayingMovies(data);
    });
  }, []);

  return (
    <main className={s.movie}>
      {popularMovies && (
        <InfoSliderSection
          title="Popular Movies"
          link="popular"
          data={popularMovies}
        />
      )}

      {topRatedMovies && (
        <InfoSliderSection
          title="Top Rated Movies"
          link="top_rated"
          data={topRatedMovies}
        />
      )}

      {upcomingMovies && (
        <InfoSliderSection
          title="Upcoming Movies"
          link="upcoming"
          data={upcomingMovies}
        />
      )}

      {nowPlayingMovies && (
        <InfoSliderSection
          title="Now Playing Movies"
          link="now_playing"
          data={nowPlayingMovies}
        />
      )}
    </main>
  );
}
