import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const MyListings = () => {
  const { user } = useContext(AuthContext); // ✅ useContext instead of use()
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch cars added by logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-listings/${user.email}`)
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // ✅ Delete car
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => setCars(cars.filter((car) => car._id !== id)))
        .catch((err) => console.error(err));
    }
  };

  // ✅ Open modal
  const handleUpdate = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // ✅ Submit update
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedCar = {
      name: e.target.name.value,
      category: e.target.category.value,
      rentPrice: parseFloat(e.target.price.value),
      status: e.target.status.value,
    };

    fetch(`http://localhost:3000/cars/${selectedCar._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then(() => {
        setCars(
          cars.map((car) =>
            car._id === selectedCar._id ? { ...car, ...updatedCar } : car
          )
        );
        setShowModal(false);
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">My Listings</h1>

      {!cars.length ? (
        <p>No cars added yet.</p>
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
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdate(car)}
                    className="btn btn-sm bg-green-300 mr-2"
                  >
                    Update
                  </button>
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

      {/* ✅ Update Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update Car</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={selectedCar.name}
                placeholder="Car Name"
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedCar.category}
                placeholder="Category"
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={selectedCar.rentPrice}
                placeholder="Rent Price"
                className="input input-bordered w-full mb-2"
                required
              />
              <select
                name="status"
                defaultValue={selectedCar.status}
                className="input input-bordered w-full mb-2"
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-sm btn-gray mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
