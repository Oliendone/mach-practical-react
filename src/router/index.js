import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Home from "../views/Home/Home";
import MovieLanding from "../views/MovieLanding/MovieLanding";
import MoviesPage from "../views/MoviesPage/MoviesPage";
import CategoryMoviesPage from "../views/CategoryMoviesPage/CategoryMoviesPage";
import SearchPage from "../views/SearchPage/SearchPage";
import ArticlePage from "../views/ArticlePage/ArticlePage";

import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />,
      <Route path="/movie" element={<MoviesPage />} />,
      <Route
        path="/movie/category/:category"
        element={<CategoryMoviesPage />}
      />
      ,
      <Route path="/movie/:id" element={<MovieLanding />} />,
      <Route path="/search/" element={<SearchPage />} />,
      <Route path="/article/:uid/:link" element={<ArticlePage />} />,
    </Route>
  )
);

export default router;
