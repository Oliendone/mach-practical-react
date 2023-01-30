import { MoviesResources } from "../utils/MoviesResources";
import {
  mapCategorizedMoviesResources,
  mapMovieDetails,
  mapMovieCast,
  mapMovieVideos,
  mapMovieImages,
} from "../mappers";

export class MoviesService {
  constructor(id) {
    this.id = id;
  }

  async getMovieResourceByCategory(category, lang, page) {
    const movieResources = new MoviesResources();

    const result = await movieResources
      .movies(category, { language: lang, page: page })
      .then((data) => {
        return data.results;
      });

    return mapCategorizedMoviesResources(result);
  }

  getTrendingMovies(lang, page) {
    return this.getMovieResourceByCategory("trending", lang, page);
  }

  getPopularMovies(lang, page) {
    return this.getMovieResourceByCategory("popular", lang, page);
  }

  getTopRatedMovies(lang, page) {
    return this.getMovieResourceByCategory("topRated", lang, page);
  }

  getUpcomingMovies(lang, page) {
    return this.getMovieResourceByCategory("upcoming", lang, page);
  }

  getNowPlayingMovies(lang, page) {
    return this.getMovieResourceByCategory("nowPlaying", lang, page);
  }

  async getMovieDetails(lang) {
    const movieResources = new MoviesResources(this.id);

    const details = await movieResources
      .movie("details", { language: lang })
      .then((data) => {
        return data;
      });

    return mapMovieDetails(details);
  }

  async getSearchedMovies(query,lang, page) {
    const movieResources = new MoviesResources();

    const results = await movieResources
      .movies("search", { query: query, language: lang, page: page })
      .then((data) => {
        return data.results;
      });

    return mapCategorizedMoviesResources(results)
  }

  async getMovieCast(lang) {
    const movieResources = new MoviesResources(this.id);

    const cast = await movieResources
      .movie("credits", { language: lang })
      .then((data) => {
        return data.cast;
      });

    return mapMovieCast(cast);
  }

  async getMovieRecommendations(lang) {
    const movieResources = new MoviesResources(this.id);

    const result = await movieResources
      .movie("recommendations", { language: lang })
      .then((data) => {
        return data.results;
      });

    return mapCategorizedMoviesResources(result);
  }

  async getMovieVideo(lang) {
    const movieResources = new MoviesResources(this.id);

    const result = await movieResources
      .movie("videos", { language: lang })
      .then((data) => {
        return data.results;
      });

    return mapMovieVideos(result);
  }

  async getMovieImages(lang) {
    const movieResources = new MoviesResources(this.id);

    const result = await movieResources.movie("images",{ language: lang }).then((data) => {
      return data;
    });

    return mapMovieImages(result);
  }
}
