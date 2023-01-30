import axiosInstance from "../axios-config";
import { getProperImageLanguageString } from "./helpers";

export class MoviesResources {
  constructor(id) {
    this.id = id;
    this.endpoints = {
      movies: {
        trending: (options = { language: "en-us", page: 1 }) => {
          return `trending/movie/week?language=${options.language}&page=${options.page}`;
        },
        popular: (options = { language: "en-us", page: 1 }) => {
          return `movie/popular?language=${options.language}&page=${options.page}`;
        },
        topRated: (options = { language: "en-us", page: 1 }) => {
          return `movie/top_rated?language=${options.language}&page=${options.page}`;
        },
        upcoming: (options = { language: "en-us", page: 1 }) => {
          return `movie/upcoming?language=${options.language}&page=${options.page}`;
        },
        nowPlaying: (options = { language: "en-us", page: 1 }) => {
          return `movie/now_playing?language=${options.language}&page=${options.page}`;
        },
        search: (options = { query: '',language: "en-us", page: 1 }) => {
          return `search/movie?query=${options.query}&language=${options.language}&page=${options.page}`;
        }
      },
      movie: {
        details: (options = { language: "en-us" }) => {
          return `/movie/${this.id}?language=${options.language}`;
        },
        credits: (options = { language: "en-us" }) => {
          return `/movie/${this.id}/credits?language=${options.language}`;
        },
        recommendations: (options = { language: "en-us" }) => {
          return `/movie/${this.id}/recommendations?language=${options.language}`;
        },
        images: (options = { language: "en-us" }) => {
          return `/movie/${this.id}/images?language=${
            options.language
          }&include_image_language=${getProperImageLanguageString(
            options.language
          )}`;
        },
        videos: (options = { language: "en-us" }) => {
          return `/movie/${this.id}/videos?language=${options.language}`;
        },
      },
    };
  }

  get(endpoint) {
    return axiosInstance
      .get(endpoint)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  movies(endpoint = "", options = {}) {
    const existingEndpoint = this.endpoints.movies[endpoint];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.get(endpoint);
    } else {
      console.log("There is no such an endpoint");
    }
  }

  movie(endpoint = "", options = {}) {
    const existingEndpoint = this.endpoints.movie[endpoint];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.get(endpoint);
    } else {
      console.log("There is no such an endpoint");
    }
  }
}
