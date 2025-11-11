import React from "react";
import { Link } from "react-router";

const LetestCar = ({ car }) => {
  return (
    <div className="relative card bg-base-100 shadow-xl p-4 border rounded-lg">
      {/* 🟢 status badge */}
      <div className="absolute top-2 right-2">
        {car.status === "unavailable" ? (
          <span className="badge badge-error text-white">Booked</span>
        ) : (
          <span className="badge badge-success text-white">Available</span>
        )}
      </div>

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
        <button
          className="btn btn-neutral mt-2 w-full"
          disabled={car.status === "unavailable"} // ❌ বুকড হলে বাটন ডিসেবল হবে
        >
          {car.status === "unavailable" ? "Already Booked" : "View Details"}
        </button>
      </Link>
    </div>
  );
};

export default LetestCar;
