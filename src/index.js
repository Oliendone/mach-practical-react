import React from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";

import App from "./App.js";
import LazyLoad from "./directives/LazyLoad";

const GRAPHQL_ENDPOINT = `https://graphql.contentstack.com/stacks/${process.env.REACT_APP_STACK_API_KEY}?environment=${process.env.REACT_APP_ENVIRONMENT_NAME}`;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    access_token: process.env.REACT_APP_ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
