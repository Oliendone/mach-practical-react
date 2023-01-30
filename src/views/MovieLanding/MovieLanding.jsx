import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { MoviesService } from "../../services/MoviesService";

import MovieHeroBanner from "../../components/MovieHeroBanner/MovieHeroBanner";
import InfoSliderSection from "../../components/InfoSliderSection/InfoSliderSection";
import ImageItem from "../../components/ImageItem/ImageItem";
import MediaModal from "../../components/MediaModal/MediaModal";

import s from "./MovieLanding.module.sass";

export default function MovieLanding() {
  const { id } = useParams();

  const movieService = new MoviesService(id);

  const [movie, setMovie] = useState(null);
  const [currentMovieSection, setCurrentMovieSection] = useState("overview");
  const [photos, setPhotos] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState({
    type: "backdrops",
    index: 0,
  });
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [videos, setVideos] = useState(null);
  const [cast, setCast] = useState(null);
  const [relevantMovies, setRelevantMovies] = useState(null);

  useEffect(() => {
    movieService.getMovieDetails("en-us").then((data) => setMovie(data));

    movieService.getMovieCast("en-us").then((data) => setCast(data));

    movieService
      .getMovieRecommendations("en-us")
      .then((data) => setRelevantMovies(data));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    switch (currentMovieSection) {
      case "videos":
        if (!videos) {
          movieService.getMovieVideo("en-us").then((data) => setVideos(data));
        }
        break;
      case "photos":
        if (!photos) {
          movieService.getMovieImages("en-us").then((data) => setPhotos(data));
        }
        break;
      default:
        break;
    }
  }, [currentMovieSection]);

  const getMediaUrl = useMemo(() => {
    if (currentMovieSection === "photos") {
      return photos[selectedPhoto.type][selectedPhoto.index].imageOrigin;
    }
    if (currentMovieSection === "videos") {
      return videos[selectedVideo].id;
    }
  }, [selectedPhoto.type, selectedPhoto.index, selectedVideo]);

  function openModalWithSelectedPhoto(index, imageType) {
    setSelectedPhoto({
      type: imageType,
      index: index,
    });
    setShowPopUp(true);
  }

  function openModalWithSelectedVideo(index) {
    setSelectedVideo(index);
    setShowPopUp(true);
  }

  function mediaNavigate(value) {
    switch (value) {
      case "prev":
        if (currentMovieSection === "photos") {
          selectedPhoto.index - 1 >= 0
            ? setSelectedPhoto((prevState) => ({
                ...prevState,
                index: prevState.index - 1,
              }))
            : setSelectedPhoto((prevState) => {
                return {
                  ...prevState,
                  index: photos[selectedPhoto.type].length - 1,
                };
              });
        } else {
          selectedVideo.value - 1 >= 0
            ? setSelectedVideo((prevState) => prevState - 1)
            : setSelectedVideo(videos.length - 1);
        }
        break;
      case "next":
        if (currentMovieSection === "photos") {
          selectedPhoto.index + 1 < photos[selectedPhoto.type].length
            ? setSelectedPhoto((prevState) => ({
                ...prevState,
                index: prevState.index + 1,
              }))
            : setSelectedPhoto((prevState) => ({
                ...prevState,
                index: 0,
              }));
        } else {
          selectedVideo + 1 < videos.length
            ? setSelectedVideo((prevState) => prevState + 1)
            : setSelectedVideo(0);
        }
        break;
      default:
        break;
    }
  }

  function toggleMovieSection(section) {
    setCurrentMovieSection(section);
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  return (
    <>
      {movie && (
        <main className={s.movieLanding}>
          <MovieHeroBanner data={movie} />
          <nav className={s.nav}>
            <button
              className={`${s.buttonNav} ${
                currentMovieSection === "overview" ? s.buttonNavActive : ""
              }`}
              onClick={() => toggleMovieSection("overview")}
            >
              Overview
            </button>
            <button
              className={`${s.buttonNav} ${
                currentMovieSection === "videos" ? s.buttonNavActive : ""
              }`}
              onClick={() => toggleMovieSection("videos")}
            >
              Videos
            </button>
            <button
              className={`${s.buttonNav} ${
                currentMovieSection === "photos" ? s.buttonNavActive : ""
              }`}
              onClick={() => toggleMovieSection("photos")}
            >
              Photos
            </button>
          </nav>
          {currentMovieSection === "overview" && (
            <div className={s.infoSection}>
              <div className={s.imageBox}>
                <ImageItem source={movie.poster} alt={movie.title} />
              </div>
              <div className={s.info}>
                <div>
                  <h2 className={s.title}>Storyline</h2>
                  <p className={s.desc}>{movie.overview}</p>
                </div>
                <div className={s.stats}>
                  <ul className={s.statsList}>
                    <li className={s.item}>
                      <div className={s.label}>Released</div>
                      <div className={s.value}>{movie.release}</div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Runtime</div>
                      <div className={s.value}>{movie.runtime}</div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Budget</div>
                      <div className={s.value}>{movie.budget} $</div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Revenue</div>
                      <div className={s.value}>{movie.revenue} $</div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Genre</div>
                      <div className={s.value}>
                        {movie.genres.map((item, index) => (
                          <span key={item.id}>
                            {item.name}
                            {index + 1 !== movie.genres.length && <>,</>}
                          </span>
                        ))}
                      </div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Status</div>
                      <div className={s.value}>{movie.status}</div>
                    </li>
                    <li className={s.item}>
                      <div className={s.label}>Production</div>
                      <div className={s.value}>
                        {movie.production.map((item, index) => (
                          <span key={item.id}>
                            {item.name}
                            {index + 1 !== movie.production.length && <>,</>}
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentMovieSection === "videos" && (
            <div className={s.videosSection}>
              <div className={s.header}>
                {videos?.length}
                {videos?.length === 1 ? "Video" : "Videos"}
              </div>
              <div className={s.items}>
                {videos?.map((item, index) => (
                  <div
                    key={item.id}
                    className={s.item}
                    onClick={() => openModalWithSelectedVideo(index)}
                  >
                    <div className={s.imageBox}>
                      <ImageItem source={item.image} alt={item.title} />
                      <div
                        className={s.playButton}
                        onClick={() => openModalWithSelectedVideo(index)}
                      >
                        <svg
                          xmlns="http//www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 55 55"
                        >
                          <circle
                            cx="27.5"
                            cy="27.5"
                            r="26.75"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          ></circle>
                          <path
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <h2 className={s.title}>{item.name}</h2>
                    <div className={s.subtitle}>{item.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentMovieSection === "photos" && (
            <div className={s.photosSection}>
              <div className={s.photosWrapper}>
                <div className={s.header}>
                  <h2 className={s.title}>Backdrops</h2>
                  <span className={s.subtitle}>
                    {photos?.backdrops.length}
                    {photos?.backdrops.length === 1 ? "Image" : "Images"}
                  </span>
                </div>
                <div className={s.items}>
                  {photos?.backdrops.map((item, index) => (
                    <div
                      className={s.item}
                      key={index}
                      onClick={() =>
                        openModalWithSelectedPhoto(index, "backdrops")
                      }
                    >
                      <ImageItem source={item.imageSmall} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.photosWrapper}>
                <div className={s.header}>
                  <h2 className={s.title}>Posters</h2>
                  <span className={s.subtitle}>
                    {photos?.posters.length}
                    {photos?.posters.length === 1 ? "Image" : "Images"}
                  </span>
                </div>
                <div className={s.items}>
                  {photos?.posters.map((item, index) => (
                    <div
                      className={`${s.item} ${s.itemPosters}`}
                      key={index}
                      onClick={() =>
                        openModalWithSelectedPhoto(index, "posters")
                      }
                    >
                      <ImageItem source={item.imageSmall} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {cast && currentMovieSection === "overview" && (
            <InfoSliderSection title="Cast" data={cast} castSlider={true} />
          )}

          {relevantMovies && (
            <InfoSliderSection title="More Like This" data={relevantMovies} />
          )}

          <MediaModal
            openPopUp={showPopUp}
            mediaUrl={getMediaUrl}
            mediaType={currentMovieSection}
            closePopUp={closePopUp}
            mediaNavigate={mediaNavigate}
          />
        </main>
      )}
    </>
  );
}
