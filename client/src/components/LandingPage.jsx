import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "./buyer_seller_connect.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">GaliPulse</h1>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Browse
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              About
            </a>
            <NavLink className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              to="/log-in"
            >
              Log in
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-snug">
            Connecting Buyers and Sellers
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Fulfill your needs by connecting with trusted local sellers who
            deliver quality goods and services directly to you.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800">
              Continue with Google
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="px-6 border-2 border-black py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-blue-500"
            >
              Continue with Email
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 mt-10 lg:mt-0 flex justify-center">
          <img
            src={image}
            alt="Connecting Buyers and Sellers"
            className="w-3/4 lg:w-2/3 rounded-lg shadow-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-blue-900">
            Why Choose GaliPulse?
          </h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Local Connections
              </h4>
              <p className="text-gray-600">
                Discover and connect with local sellers to meet your needs
                quickly and efficiently.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Trusted Sellers
              </h4>
              <p className="text-gray-600">
                Work with verified sellers for reliable and high-quality
                services.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Seamless Transactions
              </h4>
              <p className="text-gray-600">
                Enjoy smooth and secure transactions with robust technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          © 2025 GaliPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
