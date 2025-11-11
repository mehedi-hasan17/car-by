import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  // const [loadingCancel, setLoadingCancel] = useState(null); // কোন বুকিং Cancel হচ্ছে তা ট্র্যাক করতে

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-bookings/${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => toast.error("Failed to fetch bookings: " + err.message));
    }
  }, [user]);

  // Cancel booking
  // const handleCancel = async (id) => {
  //   const confirmCancel = window.confirm("Do you want to cancel this booking?");
  //   if (!confirmCancel) return;

  //   try {
  //     setLoadingCancel(id); // Loading state শুরু
  //     const res = await fetch(`http://localhost:3000/bookings/${id}`, { method: "DELETE" });
  //     const data = await res.json();

  //     if (data.deletedCount > 0) {
  //       setBookings((prev) => prev.filter((b) => b._id !== id));
  //       toast.success("Booking canceled successfully!");
  //     } else {
  //       toast.error("Failed to cancel booking!");
  //     }
  //   } catch (err) {
  //     toast.error("Server error: " + err.message);
  //   } finally {
  //     setLoadingCancel(null); // Loading state শেষ
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
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
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{user.displayName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{b.carName}</td>
                <td className="border px-4 py-2">$ {b.rentPrice} </td>
                <td className="border px-4 py-2">
                  {new Date(b.date).toLocaleDateString()}{" "} 
                  {new Date(b.date).toLocaleTimeString()}
                </td>
                <td className="border px-4 py-2">{b.status}</td>
                {/* <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleCancel(b._id)}
                    disabled={loadingCancel === b._id}
                    className={`btn btn-sm ${
                      loadingCancel === b._id ? "btn-disabled" : "btn-error"
                    }`}
                  >
                    {loadingCancel === b._id ? "Cancelling..." : "Cancel"}
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
