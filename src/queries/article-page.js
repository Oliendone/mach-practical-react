import * as contentstack from "contentstack";

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_STACK_API_KEY,
  delivery_token: process.env.REACT_APP_ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT_NAME,
});

export const getEntry = (uid,contentType = 'movie_article') => {
  const Query = Stack.ContentType(contentType).Entry(uid);

  return Query.fetch()
    .then(entry => {
      return entry.toJSON();
    })
    .catch(error => {
      console.error("Error:", error);
    });
};
