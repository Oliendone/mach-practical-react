import s from "./YouTubeEmbedVideo.module.sass";

export default function YouTubeEmbedVideo({ videoId = "" }) {
  return (
    <div className={s.video} id="video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
        allowFullScreen
      ></iframe>
    </div>
  );
}
