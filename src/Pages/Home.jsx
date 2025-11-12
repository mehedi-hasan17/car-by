import React from "react";
import { useLoaderData } from "react-router";
import LetestCar from "./LetestCar";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🚗 Latest Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
               data.map(car => <LetestCar key={car._id} car={car}></LetestCar>)
          }
        
      </div>



      
    </div>
  );
};

export default Home;
