import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./components/corporate/About";
import Contact from "./components/corporate/Contact";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Corporate from "./pages/Corporate";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/corporate/about", element: <About /> },
        { path: "/corporate/contact", element: <Contact /> },
        { path: "/corporate", element: <Corporate /> },
        { path: "/products", element: <Products /> },
        { path: "/brands", element: <Brands /> },
      ],
    },
  ],
  {
    basename: "/",
  }
);


export default router;
