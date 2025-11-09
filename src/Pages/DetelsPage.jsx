import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const DetelsPage = () => {
    const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) {
    return <p className="text-center mt-10">Loading car details...</p>;
  }
     
     
  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">

      <div>
          <img
        src={car.image}
        alt={car.name}
        className="w-full h-64 object-cover rounded-md"
      />
      </div>
     <div>
           <h2 className="text-3xl font-bold mt-4">{car.name}</h2>
      <p className="text-gray-600 mt-2">{car.description}</p>
      <p className="mt-2">
        💰 Rent Price: <b>{car.rentPrice} ৳/day</b>
      </p>
      <p>🚘 Type: {car.category}</p>
      <p>📍 Location: {car.location}</p>
      <p>👤 Provider: {car.providerName}</p>
      <p>📧 Email: {car.providerEmail}</p>

      <Link to="/">
        <button className="btn btn-neutral mt-5 w-full">Back to Home</button>
      </Link>
     </div>
    </div>
  );
};

export default DetelsPage;
