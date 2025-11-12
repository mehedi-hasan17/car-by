import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddCar = () => {
  const { user, loading } = use(AuthContext);
  const navigator = useNavigate()
  const heandleAddCar = (e) => {
    e.preventDefault();
     const form = e.target;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const rentPrice = e.target.rentPrice.value;
    const location = e.target.location.value;
    const image = e.target.image.value;
    const providerName = user?.displayName;
    const providerEmail = user?.email;

    const newCar = {
      name,
      description,
      category,
      rentPrice,
      location,
      image,
      providerName,
      providerEmail,
      createdAt: new Date(),
    };
    console.log(newCar);

    fetch('https://car-project-server-site.vercel.app/cars',{
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCar)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        toast.success("✅ Car added successfully!");
        form.reset(); 
        navigator ('/')
      } else {
        toast.error("❌ Failed to add car!");
      }
    })
    .catch((err) => toast.error("Server error: " + err.message));
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Add Car Now!</h1>
        <form onSubmit={heandleAddCar} className="space-y-4">
          <input
            name="name"s
            type="text"
            placeholder="Car Name"
            className="input rounded-full focus:border-0 focus:outline-gray-200"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            required
          />

          <select
            name="category"
           className="input rounded-full focus:border-0 focus:outline-gray-200"
            required
          >
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>

          <input
            name="rentPrice"
            type="number"
            placeholder="Rent Price (per day)"
            className="input rounded-full focus:border-0 focus:outline-gray-200"
            required
          />
          <input
            name="location"
            type="text"
            placeholder="Location"
            className="input rounded-full focus:border-0 focus:outline-gray-200"
            required
          />
          <input
            name="image"
            type="url"
            placeholder="Hosted Image URL"
           className="input rounded-full focus:border-0 focus:outline-gray-200"
            required
          />

          {/* Read-only fields */}
          <input
            value={user?.displayName || ""}
            readOnly
           className="input rounded-full focus:border-0 focus:outline-gray-200"
          />
          <input
            value={user?.email || ""}
            readOnly
            className="input rounded-full focus:border-0 focus:outline-gray-200"
          />

          <button
            type="submit"
            className="btn w-full text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
