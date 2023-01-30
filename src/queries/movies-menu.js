import {gql} from "@apollo/client";

export const MOVIES_MENU_QUERY = gql`
  query Menu($locale: String!, $uid: String!) {
    menu_movies(locale: $locale, uid: $uid) {
      menu_items {
        internal_linkConnection {
          edges {
            node {
              ... on PopularMovies {
                title
                url
              }
              ... on NowPlayingMovies {
                title
                url
              }
              ... on TopRatedMovies {
                title
                url
              }
              ... on UpcomingMovies {
                title
                url
              }
              ... on Movies {
                title
                url
              }
            }
          }
        }
        label
      }
    }
  }
`;
