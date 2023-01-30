import s from "./StarsRating.module.sass";

export default function StarsRating({ rating, landingPage }) {
  return (
    <div className={s.rating}>
      <div className={s.stars}>
        <div style={{ width: `${rating * 10}%` }} />
      </div>
      {!landingPage && <span> {rating.toFixed(1)}</span>}
    </div>
  );
}
