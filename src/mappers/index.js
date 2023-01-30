import {
  lowResImagePlacer,
  lowResBackdropPlacer,
  originalImagePlacer,
  getProperDuration,
  youTubeImagePlacer
} from "../utils/helpers";

function mapCategorizedMoviesResources(data) {
  return data.map((movie) => {
    return {
      id: movie.id,
      image: lowResImagePlacer(movie.poster_path),
      title: movie.title,
      rating: movie.vote_average,
    };
  });
}

function mapMovieProduction(data) {
  return data.map((company) => {
    return {
      name: company.name,
    };
  });
}

function mapMovieGenres(data) {
  return data.map((genre) => {
    return {
      name: genre.name,
    };
  });
}

function mapMovieDetails(details) {
  return {
    id: details.id,
    backdrop: originalImagePlacer(details.backdrop_path),
    poster: lowResImagePlacer(details.poster_path),
    title: details.title,
    overview: details.overview,
    release: details.release_date,
    runtime: getProperDuration(details.runtime),
    budget: details.budget,
    revenue: details.revenue,
    genres: mapMovieGenres(details.genres),
    rating: details.vote_average,
    votes: details.vote_count,
    status: details.status,
    production: mapMovieProduction(details.production_companies),
  };
}

function mapMovieCast(data) {
  return data.map((person) => {
    return {
      id: person.id,
      name: person.name,
      character: person.character,
      image: lowResImagePlacer(person.profile_path),
    };
  });
}

function mapMovieVideos(data) {
  return data.map((data) => {
    return {
      name: data.name,
      type: data.type,
      id: data.key,
      image: youTubeImagePlacer(data.key)
    };
  });
}

function mapMovieImages(data) {
  return {
    backdrops: mapMovieBackdropsData(data.backdrops),
    posters: mapMoviePostersData(data.posters),
  };
}

function mapMoviePostersData(images) {
  return images.map((image) => {
    return {
      imageSmall: lowResImagePlacer(image.file_path),
      imageOrigin: originalImagePlacer(image.file_path),
    };
  });
}

function mapMovieBackdropsData(images) {
  return images.map((image) => {
    return {
      imageSmall: lowResBackdropPlacer(image.file_path),
      imageOrigin: originalImagePlacer(image.file_path),
    };
  });
}

function mapYouTubeVideos(youtube) {
  return youtube.data.items.map(video => {
    return {
      image: video.snippet.thumbnails.medium.url
    }
  })
}

export {
  mapCategorizedMoviesResources,
  mapMovieDetails,
  mapMovieCast,
  mapMovieVideos,
  mapMovieImages,
  mapYouTubeVideos
};
