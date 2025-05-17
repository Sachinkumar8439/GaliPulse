import React from "react";
import image from "./buyer_seller_connect.png"

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">GaliPulse</h1>
          <div className="space-x-6">
            <a href="#" className="text-lg hover:text-purple-300">
              Browse
            </a>
            <a href="#" className="text-lg hover:text-purple-300">
              About
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
              Log in
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Connecting Buyers and Sellers
            </h2>
            <p className="text-lg mb-6">
              Fulfill your needs by connecting with local sellers who deliver
              directly to you.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-grow px-4 py-2 rounded bg-blue-700 placeholder-blue-400 text-white focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                Post a Need
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
                Fulfill a Need
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={image}
              alt="Connecting Buyers and Sellers"
              className="rounded-lg shadow-lg"
              width="70%"
            />
          </div>
        </header>

        {/* Categories Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <CategoryCard title="Produce" icon="🍎" />
            <CategoryCard title="Handmade" icon="🛠️" />
            <CategoryCard title="Electronics" icon="💻" />
            <CategoryCard title="Clothing" icon="👕" />
          </div>
        </section>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, icon }) => (
  <div className="flex flex-col items-center bg-blue-700 p-4 rounded-lg shadow-lg">
    <div className="text-4xl mb-2">{icon}</div>
    <h4 className="text-lg font-bold">{title}</h4>
  </div>
);

export default LandingPage;
