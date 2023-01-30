import { RouterProvider } from "react-router-dom";
import "./App.sass";

import router from "./router";

export default function App() {
  return <RouterProvider router={router} />;
}
