import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
const DetelsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const { user } = use(AuthContext);

  // 1️⃣ গাড়ির তথ্য লোড করা
  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) {
    return <p className="text-center mt-10">Loading car details...</p>;
  }

  // 2️⃣ বুকিং হ্যান্ডলার
  const handleBooking = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "You must be logged in to book a car.",
      });
      return;
    }

    const bookingData = {
      carId: car._id,
      carName: car.name,
      rentPrice: car.rentPrice,
      bookedBy: user.email,
      providerEmail: car.providerEmail,
      date: new Date().toISOString(),
      status: "Confirmed",
    };

    // console.log(bookingData)
    fetch(`http://localhost:3000/bookings/${car._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: `${car.name} has been booked successfully.`,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed!",
          text: "Please try again later.",
        });
      });
  };

  // 3️⃣ UI
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="card bg-base-100 shadow-xl p-6 rounded-lg border">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
        <p className="mb-2">{car.description}</p>
        <p className="mb-1">🚘 Category: {car.category}</p>
        <p className="mb-1">💰 Rent Price: {car.rentPrice} ৳ / day</p>
        <p className="mb-1">📍 Location: {car.location}</p>
        <p className="mb-1">📊 Status: {car.status}</p>

        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-1">Provider Info</h2>
          <p>👤 Name: {user.displayName}</p>
          <p>📧 Email: {user.email}</p>
        </div>

        <button onClick={handleBooking} className="btn btn-primary mt-6 w-full">Book Now</button>
      </div>
    </div>
  );
};

export default DetelsPage;
