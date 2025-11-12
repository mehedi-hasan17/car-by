import React, { useEffect, useState,use } from "react";

import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyListings = () => {
  const { user } = use(AuthContext);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-listings/${user.email}`)
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

 const handleDelete = (id) => {
  
  fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      if (data.deletedCount > 0) {
        setCars((prevCars) => prevCars.filter((car) => car._id !== id));
        toast.success("Car deleted successfully!");
      } else {
        toast.error("Failed to delete car!");
      }
    })
    .catch((err) => {
      toast.error("Server error: " + err.message);
    });
};

  const handleUpdate = (id) => {
    navigate(`/update-car/${id}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">My Listings</h1>

      {!cars.length ? (
        <p className="text-center text-gray-500">No cars added yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Car Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Rent Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="border px-4 py-2">{car.name}</td>
                <td className="border px-4 py-2">{car.category}</td>
                <td className="border px-4 py-2">${car.rentPrice}</td>
                <td className="border px-4 py-2">{car.status}</td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/update-car/${car._id}`}>
                  <button
                    onClick={() => handleUpdate(car._id)}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Update
                  </button></Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyListings;
