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
import { PriviteRouts } from '../Context/PrivateRouter.jsx'
import UpdateCar from "../Pages/UpdateCar.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index: true,
        Component: Home,
        loader: ()=>fetch('https://car-project-server-site.vercel.app/latest-cars')
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

        element:<PriviteRouts><AddCar></AddCar></PriviteRouts> 
      },
      {
        path:'/browse-car',
        element: <BrowerCars></BrowerCars>,
        loader: () => fetch('https://car-project-server-site.vercel.app/cars')
        
      },
      {
        path:'/my-bookings',
        element: <PriviteRouts><MyBookings></MyBookings></PriviteRouts>
      },
      {
        path:'/my-listings',
        element: <PriviteRouts><MyListings></MyListings></PriviteRouts>
      },
      {
        path:'/detels-page/:id',
        element: <PriviteRouts><DetelsPage></DetelsPage></PriviteRouts>
      },
      {
        path:'//update-car/:id',
        element: <PriviteRouts><UpdateCar></UpdateCar></PriviteRouts>
      },
    ]
  },
]);