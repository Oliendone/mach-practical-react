import { appRoute, isAppTypeIsProd } from "../constants";

function lowResImagePlacer(id) {
  return id ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${id}` : "";
}

function lowResBackdropPlacer(id) {
  return id ? `https://image.tmdb.org/t/p/w533_and_h300_bestv2${id}` : "";
}

function originalImagePlacer(id) {
  return id ? `https://image.tmdb.org/t/p/original${id}` : "";
}

function getProperDuration(time) {
  const hours = Math.floor(time / 60);
  const minutes = time - hours * 60;

  return `${hours}h ${minutes}min`;
}

function youTubeImagePlacer(id) {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

function getProperImageLanguageString(lang) {
  switch (lang) {
    case "en-us":
      return "en";
    case "uk-ua":
      return "ua";
    default:
      return "en";
  }
}

function getProperMovieLink(link) {
  if (link === "movie") {
    return isAppTypeIsProd
      ? `/${appRoute}/${link}`
      : `/${link}`;
  }
  return isAppTypeIsProd
    ? `/${appRoute}/movie/category/${link}`
    : `/movie/category/${link}`;
}

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export {
  lowResImagePlacer,
  lowResBackdropPlacer,
  originalImagePlacer,
  getProperDuration,
  youTubeImagePlacer,
  getProperMovieLink,
  getProperImageLanguageString,
  debounce,
};
