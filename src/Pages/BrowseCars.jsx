import React from "react";
import { useLoaderData } from "react-router";
import LetestCar from "./LetestCar";

const BrowseCars = () => {
  const data = useLoaderData();
  console.log(data);

  return (
     <div className="my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
               data.map(car => <LetestCar key={car._id} car={car}></LetestCar>)
          }
        
      </div>
    </div>
  );
};

export default BrowseCars;
