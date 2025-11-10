import React from "react";
import { Link, useLoaderData } from "react-router";

const BrowseCars = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((car) => (
        <div car={car} >
          <div className="card bg-base-100 shadow-xl p-4 border rounded-lg">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{car.name}</h2>
            <p>💰 Rent: {car.rentPrice} ৳ / day</p>
            <p>🚘 Type: {car.category}</p>
            <p>👤 Provider: {car.providerName}</p>
            <Link to={`/detels-page/${car._id}`}>
              <button className="btn btn-neutral mt-2 w-full">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseCars;
