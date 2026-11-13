// src/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";

// Customer pages
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import Profile from "./pages/customer/Profile";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetails from "./pages/customer/OrderDetails";
import Favorites from "./pages/customer/Favorites";
import Contact from "./pages/customer/Contact";
import NotFound from "./pages/customer/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "menu/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-orders/:id", element: <OrderDetails /> },
      { path: "favorites", element: <Favorites /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
