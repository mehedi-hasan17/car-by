import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import AddCar from "../Pages/AddCar.jsx"
import BrowerCars from "../Pages/BrowseCars.jsx"
import MyBookings from "../Pages/MyBookings.jsx"
import MyListings from "../Pages/MyListings.jsx"
import Home from "../Pages/Home.jsx";
import DetelsPage from "../Pages/DetelsPage.jsx";
import ErrorPage from "../Componets/ErrorPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index: true,
        Component: Home,
        loader: ()=>fetch('http://localhost:3000/latest-cars')
      },
      {
        path:'/register',
        Component: Register
      },
      {
        path:'/login',
        Component: Login
      },
      {
        path:'add-car',
        Component: AddCar,
      },
      {
        path:'/browse-car',
        Component: BrowerCars
      },
      {
        path:'/my-bookings',
        Component: MyBookings
      },
      {
        path:'/my-listings',
        Component: MyListings
      },
      {
        path:'/detels-page/:id',
        Component: DetelsPage
      },
    ]
  },
]);