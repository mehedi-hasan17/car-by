import React from "react";
import Navber from "../Navber/Navber";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <Navber className="sticky top-0 z-50"></Navber>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-green-100">
        <Outlet></Outlet>
      </main>
      <header>
        <Footer className="sticky top-0 z-50"></Footer>
      </header>
    </div>
  );
};

export default Root;
