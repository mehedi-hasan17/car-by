import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";


const UpdateCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  // ✅ গাড়ির পুরনো ডেটা লোড করা
  useEffect(() => {
    fetch(`https://car-project-server-site.vercel.app/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ ফরম সাবমিট করলে আপডেট হবে
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCar = {
      name: e.target.name.value,
      category: e.target.category.value,
      rentPrice: parseFloat(e.target.price.value),
      status: e.target.status.value,
    };

    fetch(`https://car-project-server-site.vercel.app/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Car updated successfully!");
        navigate("/my-listings"); // ✅ আপডেট শেষে ফিরে যাবে
      })
      .catch((err) => console.error("Update error:", err));
  };

  if (!car) return <p className="text-center mt-10">Loading car info...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={car.name}
          placeholder="Car Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          defaultValue={car.category}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="price"
          defaultValue={car.rentPrice}
          placeholder="Rent Price"
          className="input input-bordered w-full"
          required
        />
        <select
          name="status"
          defaultValue={car.status}
          className="select select-bordered w-full"
        >
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/my-listings")}
            className="btn btn-outline btn-sm"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success btn-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCar;
