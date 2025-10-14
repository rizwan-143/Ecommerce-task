import { useState } from "react";
import { bannerPictures } from "../apis/pictures";
import { NavLink } from "react-router-dom";

function Banner() {
  const [currentPic, setCurrentPic] = useState(1);

  const picPerPage = 1;
  const indexOfLast = picPerPage * currentPic;
  const indexOfStart = indexOfLast - picPerPage;
  const currentPicture = bannerPictures.slice(indexOfStart, indexOfLast);

  return (
    <div className="relative w-full h-[450px] overflow-hidden  shadow-lg group">
      {/* Background Image */}
      {currentPicture.map((pic, index) => (
        <img
          key={index}
          src={pic.image}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0 -z-10 transition-all duration-700 ease-in-out"
        />
      ))}

      {/* Dark overlay */}
<div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent transition-all duration-500 ease-in-out group-hover:h-full"></div>

      {/* ✅ Centered Text Content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
          Discover New Deals
        </h1>
        <p className="text-lg opacity-90 mb-6 max-w-md mx-auto">
          Shop the latest collections and get exclusive offers every week!
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-300">
         <NavLink to = "/products">Shop Now</NavLink>
        </button>
      </div>

      {/* Right Arrow */}
      <button onClick={() => {
        if(currentPic < bannerPictures.length){
          setCurrentPic(currentPic + 1)
        }
      }}
       className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm p-1 lg:p-3 rounded-full text-3xl z-20 transition-all duration-300 hover:scale-110">
        <i className="ri-arrow-right-s-line"></i>
      </button>

      {/* Left Arrow */}
      <button onClick={() => {
        if(currentPic > 1){
          setCurrentPic(currentPic - 1)
        }
      }}
       className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm p-1 lg:p-3 rounded-full text-3xl z-20 transition-all duration-300 hover:scale-110">
        <i className="ri-arrow-left-s-line"></i>
      </button>
    </div>
  );
}

export default Banner;
