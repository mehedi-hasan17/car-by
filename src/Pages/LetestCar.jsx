import React from "react";
import { Link } from "react-router";

const LetestCar = ({ car }) => {
  return (
    <div
      className="relative card shadow-xl p-4 rounded-xl border border-white/20 
      bg-gradient-to-r from-purple-600 via-pink-500 to-orange-300 text-white
      transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/40 animate-fadeIn"
    >
      {/* 🟢 Status Badge */}
      <div className="absolute top-2 right-2">
        {car.status === "unavailable" ? (
          <span className="badge badge-error text-white animate-pulse">
            Booked
          </span>
        ) : (
          <span className="badge badge-success text-white animate-bounce">
            Available
          </span>
        )}
      </div>

      {/* 🖼️ Image */}
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-40 object-cover rounded-lg border-2 border-white/30 transition-transform duration-500 hover:scale-105"
      />

      {/* 🚗 Info */}
      <h2 className="text-xl font-semibold mt-3 drop-shadow-lg">
        {car.name}
      </h2>
      <p>💰 Rent: {car.rentPrice} ৳ / day</p>
      <p>🚘 Type: {car.category}</p>
      <p>👤 Provider: {car.providerName}</p>

      {/* 🔘 Button */}
      <Link to={`/detels-page/${car._id}`}>
        <button
          className="btn bg-black text-white mt-3 w-full "
          disabled={car.status === "unavailable"}
        >
          {car.status === "unavailable" ? "Already Booked" : "View Details"}
        </button>
      </Link>
    </div>
  );
};

export default LetestCar;
