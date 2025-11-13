import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Slider from "react-slick";
import LetestCar from "./LetestCar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const data = useLoaderData();
  const [searchCar, setSearchCar] = useState(data)
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const heroSlides = [
    {
      img: "https://i.postimg.cc/vZ1GnNVC/118050.jpg",
      title: "Drive Your Dream Car",
      desc: "Affordable rentals with premium comfort.",
    },
    {
      img: "https://i.postimg.cc/V6vr0Rmx/GT-Azure-Dynamic-Desktop.jpg",
      title: "Explore with Freedom",
      desc: "Book instantly and travel anywhere, anytime!",
    },
    {
      img: "https://i.postimg.cc/mgdpzJ6C/pexels-pixabay-35967.jpg",
      title: "Trusted Car Rentals",
      desc: "Thousands of happy customers every month!",
    },
  ];
  const heandelSearch= (e) =>{
    e.preventDefault();
    const secrchValue = e.target.search.value;
    fetch(`https://car-project-server-site.vercel.app/search?search=${secrchValue}`)
    .then(res => res.json())
    .then(data =>{
      setSearchCar(data);
      e.target.reset()
      console.log(data);
      
    })
    .catch(err =>{
      console.log(err);
      
    })  
  }

  return (
    <div className="p-6 space-y-16">
      {/* 🔹 Hero Slider */}
      <Slider {...sliderSettings} className="rounded-xl overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-80 p-4 rounded">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="text-sm">{slide.desc}</p>
            </div>
          </div>
        ))}
      </Slider>

      <section>
        <form onSubmit={heandelSearch} className="text-center">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search"  placeholder="Search" />
        </label>
        <button className="btn text-2xl p-5 btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white ml-2">Search</button>
        </form>
      </section>
      {/* 🔹 Latest Cars */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchCar.map((car) => (
            <LetestCar key={car._id} car={car}></LetestCar>
          ))}
        </div>
      </section>

      {/* 🔹 Why Rent With Us */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">🌟 Why Rent With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Easy Booking",
              desc: "Book your car in just a few clicks!",
            },
            {
              title: "Affordable Rates",
              desc: "Best price guaranteed every time.",
            },
            {
              title: "Trusted Providers",
              desc: "Verified cars and owners only.",
            },
            {
              title: "24/7 Support",
              desc: "We’re here whenever you need us.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-base-200 rounded-xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Top Rated Cars */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">🔥 Top Rated Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "https://i.postimg.cc/KYJxLhYK/download-10.jpg",
            "https://i.postimg.cc/LXg4M0mr/KG14-BANNER-2.png",
            "https://i.postimg.cc/cLvbTqT0/images-11.jpg",
          ].map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl h-90   shadow hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </section>

      {/* 🔹 Customer Testimonials */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">💬 Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Arif Hossain",
              feedback: "Excellent service! The car was clean and on time.",
            },
            {
              name: "Sadia Rahman",
              feedback: "Loved the smooth booking experience and great prices!",
            },
            {
              name: "Tanvir Alam",
              feedback:
                "Highly recommend! Friendly provider and comfortable ride.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 bg-base-200 rounded-xl shadow hover:shadow-xl transition"
            >
              <p className="italic">“{t.feedback}”</p>
              <h3 className="mt-4 font-semibold">{t.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
