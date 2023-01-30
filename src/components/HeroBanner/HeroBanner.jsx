import { useQuery } from "@apollo/client";
import { HERO_BANNER_QUERY } from "../../queries/hero-banner";

import s from "./HeroBanner.module.sass";

export default function HeroBanner() {
  const { data } = useQuery(HERO_BANNER_QUERY, {
    variables: {
      locale: "en-us",
      uid: "blt8efccc6cb5552902",
    },
  });

  return (
    <>
      {!data && (
        <div className={s.skeleton}>
          <div className={s.ldsDualRing}></div>
        </div>
      )}
      {data && (
        <>
          <div
            className={s.heroBanner}
            style={{
              backgroundImage: `url('${data.hero_banner.banner[0].intro.background_imageConnection.edges[0].node.url}')`,
            }}
          >
            <div className={`${s.wrapper} ${s.container}`}>
              <h1 className={s.header}>{data.hero_banner.title}</h1>
              <p className={s.text}>
                {data.hero_banner.banner[0].intro.description}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
