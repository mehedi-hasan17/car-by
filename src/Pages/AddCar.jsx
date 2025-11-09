import React from "react";

const AddCar = () => {
  const heandleAddCar = (e) => {
    e.preventDefault();
    const name = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    console.log(name, photoURL);
    
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Add Car Now!</h1>
        <form onSubmit={heandleAddCar}>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Name"
            />
            <label className="label">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
            />
            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
              Add Car
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddCar;


