import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { MoviesService } from "../../services/MoviesService";
import { MOVIE_ARTICLES_QUERY } from "../../queries/movie-articles";

import HeroBanner from "../../components/HeroBanner/HeroBanner";
import InfoSliderSection from "../../components/InfoSliderSection/InfoSliderSection";

import s from "./Home.module.sass";

export default function Home() {
  const moviesService = new MoviesService();

  const [trendingMovies, setTrendingMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    moviesService.getTrendingMovies("en-us", page).then((data) => {
      if (!isCancelled) {
        setTrendingMovies(data);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const { data: articles } = useQuery(MOVIE_ARTICLES_QUERY);

  return (
    <main className={s.home}>
      <HeroBanner />

      {trendingMovies && (
        <InfoSliderSection
          title="Trending Movies"
          link="popular"
          data={trendingMovies}
        />
      )}

      {articles && (
        <InfoSliderSection
          title="Articles"
          data={articles.all_movie_article.items}
          articlesSlider={true}
        />
      )}
    </main>
  );
}
