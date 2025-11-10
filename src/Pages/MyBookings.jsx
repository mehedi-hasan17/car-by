import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize toast once in your app
// toast.configure();

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-bookings/${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Cancel booking
  const handleCancel = (id) => {
    if (confirm("Do you want to cancel this booking?")) {
      fetch(`http://localhost:3000/bookings/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            setBookings((prev) => prev.filter((b) => b._id !== id));
            toast.success("Booking canceled successfully!");
          } else {
            toast.error("Failed to cancel booking!");
          }
        })
        .catch((err) => toast.error("Server error: " + err.message));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Car Name</th>
              <th className="border px-4 py-2">Rent Price</th>
              <th className="border px-4 py-2">Booked Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="border px-4 py-2">{user.displayName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{b.carName}</td>
                <td className="border px-4 py-2">${b.rentPrice}</td>
                <td className="border px-4 py-2">
                  {new Date(b.date).toLocaleDateString()}{" "}
                  {new Date(b.date).toLocaleTimeString()}
                </td>
                <td className="border px-4 py-2">{b.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
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

export default MyBookings;
