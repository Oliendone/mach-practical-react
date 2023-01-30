import {gql} from "@apollo/client";

export const HERO_BANNER_QUERY = gql`
  query HeroBanner($locale: String!, $uid: String!) {
    hero_banner(locale: $locale, uid: $uid) {
      banner {
        ... on HeroBannerBannerIntro {
          __typename
          intro {
            description
            background_imageConnection {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
        ... on HeroBannerBannerAfter {
          __typename
          after {
            text
          }
        }
      }
      title
    }
  }
`;
