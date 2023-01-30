import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getEntry } from "../../queries/article-page";
import { jsonToHtml } from "@contentstack/json-rte-serializer";

import StarsRating from "../../components/StarsRating/StarsRating";
import ArticleItem from "../../components/ArticleItem/ArticleItem";

import s from "./ArticlePage.module.sass";

export default function ArticlePage() {
  const [entry, setEntry] = useState(null);
  const [convertedText, setConvertedText] = useState(null);
  const [articleAuthor, setArticleAuthor] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const { uid } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getArticleData(uid);
  }, [uid]);

  const getArticleData = (uid) => {
    getEntry(uid).then((data) => {
      setEntry(data);

      setConvertedText(jsonToHtml(data.json_text));

      getEntry(data.article_author[0].uid, "author_article").then(
        (authorData) => {
          setArticleAuthor(authorData);
        }
      );

      setRelatedArticles([]);
      getRelatedArticles(data.related_articles);
    });
  };

  const getRelatedArticles = (articles) => {
    articles.forEach((article) => {
      getEntry(article.uid).then((data) =>
        setRelatedArticles((prevState) => {
          return [...prevState, data];
        })
      );
    });
  };

  return (
    <div className={s.wrapper}>
      {!entry && (
        <div className={s.skeleton}>
          <div className={s.loader}></div>
        </div>
      )}

      {entry && (
        <div className={s.content}>
          <div>
            <img src={entry.image.url} className={s.image} />
          </div>
          <div className={s.mainInfo}>
            <div className={s.info}>
              <h1 className={s.title}>{entry.title}</h1>
              {articleAuthor && (
                <div className={s.authorBox}>
                  <div className={s.boxImage}>
                    <img
                      src={articleAuthor.author_image.url}
                      alt=""
                      className={s.image}
                    />
                  </div>
                  <div className={s.name}>{articleAuthor.name}</div>
                  <div className={s.time}>
                    {new Date(entry.date).toDateString()}
                  </div>
                  <div className={s.starRating}>
                    <StarsRating rating={entry.star_rating * 2} />
                  </div>
                </div>
              )}
              <div
                className={s.text}
                dangerouslySetInnerHTML={{ __html: convertedText }}
              />
            </div>

            {relatedArticles && (
              <div className={s.related}>
                <h2>Related Articles:</h2>
                {relatedArticles.map((item) => {
                  return (
                    <ArticleItem
                      key={item.uid}
                      title={item.title}
                      image={item.image.url}
                      uid={item.uid}
                      link={item.url.toLowerCase()}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
