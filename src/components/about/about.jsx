import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mb-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Our Store</h1>
          <p className="text-gray-700 text-lg mb-6">
            Welcome to ShopEase! We are committed to providing the best quality products
            at amazing prices. Our mission is to make online shopping simple, fast, and enjoyable for everyone.
          </p>
          <p className="text-gray-700 text-lg">
            From the latest gadgets to stylish apparel, we ensure all our products are
            handpicked and verified for quality. Join thousands of happy customers today!
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1581091215368-6d0c9885c0b7?auto=format&fit=crop&w=800&q=80"
            alt="E-commerce"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features / Highlights */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Fast Delivery</h2>
          <p className="text-gray-600">
            Get your orders delivered quickly with our reliable shipping partners.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Quality Products</h2>
          <p className="text-gray-600">
            We carefully select products to ensure only the best reaches our customers.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">24/7 Support</h2>
          <p className="text-gray-600">
            Our friendly support team is always ready to help you with any queries.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6">
          Sign up today to get updates on the latest products and exclusive deals!
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Sign Up Now
        </button>
      </div>
    </div>
  );
}

export default About;
