import React, { useState } from "react";
import Navbar from "../common/navbar";
import { useText } from "../../Context/searchProvider";
import { useDispatch, } from "react-redux";
import { getHomeSearch } from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const [searchbutton, setSearch] = useState(false);
  const { text, setEnteredText } = useText();

  
  const navigate=useNavigate();
  const dispatch = useDispatch();


  const handleInputChange = (event) => {
    setEnteredText(event.target.value);
  };

  const productSearch=async()=>{
    const coordinates = [text];
    await dispatch(getHomeSearch(coordinates));
    navigate('/products');


  } 

  return (
    <div className="bg-gradient-to-b from-[#FFBA4F]  via-[#FFD492] via-70% to-[#FFFFFF] to-100% flex ">
      <div className="mx-32 w-2/3">
        <Navbar />
        <div className="my-20">
          <div className="outfit-700 text-[52px]">Shop local, </div>
          <div className="outfit-700 text-[52px]">Shop handmade.</div>
          <div className="outfit-500 w-[80%] my-5">
            Discover a wide variety of products, from jewelery to home decor to
            apparel, all made with love by local artisans. Shop now and support
            your local community!
          </div>
          {!searchbutton && (
            <button
              className="bg-gradient-to-l from-[#F47726] to-[#FFB483] to-90% text-black outfit-600  py-4 px-7 rounded-full shadow-xl hover:scale-105 transition-transform duration-[700ms]"
              onClick={() => setSearch(true)}
            >
              Search for Products
            </button>
          )}
          {searchbutton && (
            <div className="mb-3">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  className="relative m-0 block flex-auto rounded border border-solid  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-secondary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(255,165,0)] focus:outline-none border-neutral-600 text-black"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={text}
                  onChange={handleInputChange}
                />

                <button onClick={productSearch}>
                  <span
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 transition-transform duration-[400ms]  hover:scale-[1.10]"
                    id="basic-addon2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <img src="/images/home/hero.png" alt="hero_img" className="" />
      </div>
    </div>
  );
};

export default Hero;
