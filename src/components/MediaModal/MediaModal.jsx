import YouTubeEmbedVideo from "../YouTubeEmbedVideo/YouTubeEmbedVideo";

import s from "./MediaModal.module.sass";

export default function MediaModal({
  openPopUp,
  closePopUp,
  mediaUrl,
  mediaType,
  mediaNavigate,
}) {
  return (
    <>
      {openPopUp && (
        <div className={s.overlay} onClick={closePopUp}>
          <div className={s.modalWrapper}>
            <div
              className={`${s.modalBody} ${
                mediaType === "videos" ? s.modalBodyVideo : ""
              }`}
            >
              <button className={s.buttonClose} onClick={closePopUp}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                >
                  <g
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  >
                    <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path>
                  </g>
                </svg>
              </button>
              {mediaType === "photos" && (
                <img className={s.modalImage} src={mediaUrl} alt="" />
              )}
              {mediaType === "videos" && (
                <YouTubeEmbedVideo videoId={mediaUrl} />
              )}
              <div className={s.modalNav}>
                <button
                  className={`${s.modalArrow} ${s.modalArrowPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    mediaNavigate("prev");
                  }}
                >
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      d="M17.9 23.2L6.1 12 17.9.8"
                    ></path>
                  </svg>
                </button>
                <button
                  className={`${s.modalArrow} ${s.modalArrowNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    mediaNavigate("next");
                  }}
                >
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      d="M17.9 23.2L6.1 12 17.9.8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
