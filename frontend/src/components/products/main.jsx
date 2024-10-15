import React, { useState, useEffect } from "react";
import {
  getHomeSearch,
  getProductById,
  getproduct
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../pages/search_location/SearchLocation";
import { useText } from "../../Context/searchProvider";


const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.product);

  const [productsList, setProductslist] = useState(products);

  const fetchProduct = async (id) => {
    await dispatch(getProductById(id));
    setIndividualText(id);
    console.log(individual);

    navigate("/individual");
  };


  const fetchSettings=async()=>{
    const coordinates = [longitude,latitude,maxDistance,text];
    await dispatch(getproduct(coordinates));
  }

  useEffect(() => {
    setProductslist(products);
    console.log(products);
  }, [products]);


  useEffect(()=>{
    const coordinates = [text];
    dispatch(getHomeSearch(coordinates));
  },[])

  // const [products, setProducts] = useState([
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         img: '/images/product-sample.jpg',
  //         detail: 'm',
  //         quantity: 1,
  //         price: 55,

  //     },
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         detail: 'm',
  //         img: '/images/product-sample.jpg',

  //         quantity: 2,
  //         price: 55,

  //     },
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         detail: 'm',
  //         img: '/images/product-sample.jpg',

  //         quantity: 2,
  //         price: 55,

  //     },
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         detail: 'm',
  //         img: '/images/product-sample.jpg',

  //         quantity: 2,
  //         price: 55,

  //     },
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         detail: 'm',
  //         img: '/images/product-sample.jpg',

  //         quantity: 2,
  //         price: 55,

  //     },
  //     {
  //         name: "Gradient Graphic T-Shirt",
  //         detail: 'm',
  //         img: '/images/product-sample.jpg',

  //         quantity: 2,
  //         price: 55,

  //     }

  // ]);

  const { text, setEnteredText,setIndividualText,individual } = useText();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [maxDistance, setMaxdistance] = useState(null);

  const handleInputChange = (event) => {
    setEnteredText(event.target.value);
  };

  return (
    <div>
      <div className="flex mx-20 my-11 items-center">
        <div className=" text-gray-600 ">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={text}
            onChange={handleInputChange}
          />
        </div>
        <div className="mx-11 ">
          <SearchBox
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
          />
        </div>
        <input
          className="border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[20%] px-4 py-2.5 outline-none "
          type="Number"
          value={maxDistance}
          onChange={(e) => setMaxdistance(e.target.value)}
          placeholder="Max Range(m)"
        />
       <button onClick={fetchSettings} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mx-2">
        Find
       </button>
      </div>

      {productsList.length === 0 ? (
        <div className="outfit-500 flex justify-center items-center h-screen">
          No results for "{text}"
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mx-20   ">
          {productsList.map((p) => (
            <div className="p-2" key={p._id}>
              <button key={p._id} onClick={() => fetchProduct(p._id)}>
                
                <img
                  src={p.image}
                  alt="img"
                  className=""
                />
                <div className="outfit-600 text-[20px] my-2 ">{p.name}</div>
                <div className="outfit-500 text-[21px]">Rs.{p.price}</div>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* <div className="grid grid-cols-4 gap-4 mx-20   ">
        {products.map((p) => (
          <div className="p-2 ">
            <img
              src={p.img}
              alt="img"
              className="object-fit rounded-xl h-[60%] w-full"
            />
            <div className="outfit-600 text-[20px] my-2 ">{p.name}</div>
            <div className="outfit-500 text-[21px]">Rs.{p.price}</div>
          </div>
        ))}
      </div>*/}
    </div>
  );
};

export default Main;
