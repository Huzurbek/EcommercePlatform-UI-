// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Shop from "./pages/ecommerce/shop";
import Root from "./Root";
import { Box } from "@mui/material";
import Basket from "./pages/ecommerce/basket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Shop />,
        index: true,
      },
      { path: "/detail/:productId", element: <h2>Product Detail</h2> },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
    ],
  },
  { path: "/other", element: <h1>Other page</h1> },
]);

function App() {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
