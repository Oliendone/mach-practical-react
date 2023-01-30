import { useState, useRef } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { MOVIES_MENU_QUERY } from "../../queries/movies-menu";

import s from "./Header.module.sass";

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBar = useRef();

  const navigate = useNavigate();

  const { data } = useQuery(MOVIES_MENU_QUERY, {
    variables: {
      uid: "bltfaf26acf86ea7588",
      locale: "en-us",
    },
  });

  function handleSearchInput(event) {
    navigate(
      {
        pathname: "/search/",
        search: "?" + createSearchParams({ q: event.target.value }),
      },
      {
        state: window.location.pathname,
      }
    );
    setSearchQuery(event.target.value);

    if (event.target.value === "") {
      closeSearchBar();
    }
  }

  function openSearchbar() {
    setShowSearchBar(true);
    setTimeout(() => {
      searchBar.current.classList.add(s.searchBarOpen);
    }, 0);
  }

  function closeSearchBar() {
    searchBar.current.classList.remove(s.searchBarOpen);
    setSearchQuery("");
    setTimeout(() => {
      setShowSearchBar(false);
    }, 200);
  }

  const menuLinks = data?.menu_movies.menu_items.map((item, index) => (
    <Link
      to={item.internal_linkConnection.edges[0].node.url}
      key={index}
      className={s.text}
    >
      {item.label.toUpperCase()}
    </Link>
  ));

  return (
    <>
      <header className={s.header}>
        <div className={s.wrapper}>
          <Link to="/" className={s.text}>
            MOVIES BASE
          </Link>
          {menuLinks}
          <button className={s.button} onClick={openSearchbar}>
            Search
          </button>
        </div>
      </header>
      {showSearchBar && (
        <div ref={searchBar} className={s.searchBar}>
          <form autoComplete="off" className={s.formWrapper}>
            <label htmlFor="search" className={s.visuallyHidden}>
              Search
            </label>
            <div className={s.field}>
              <input
                id="search"
                name="search"
                className={s.input}
                value={searchQuery}
                onInput={handleSearchInput}
                type="text"
                placeholder="Search for a movie, tv show or person..."
              />
              <button
                type="button"
                aria-label="Close"
                className={s.buttonClose}
                onClick={closeSearchBar}
              >
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
            </div>
          </form>
        </div>
      )}
    </>
  );
}
