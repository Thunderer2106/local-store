import React, { useState } from "react";
import { useEffect } from "react";
// import Rectangled from "../assets/Re
import { useDispatch, useSelector } from "react-redux";
// import icon1 from "../assets/icon1.svg";
// import icon2 from "../assets/icon2.svg";
// import Naavbar from "./Navvbar";
// import Footer from "./Footer";

import { getorders } from "../../features/orders/orderSlice";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/cart/Footer";

const data = [
  {
    image: "",
    title: "Lucca Bike Tour",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    date: "Tuesday, 02 Oct 2022",
    price: "34€",
  },
  {
    image: "",
    title: "Lucca Bike Tour",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    date: "Tuesday, 02 Oct 2022",
    price: "34€",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  const getOrs = async () => {
    await dispatch(getorders());
  };

  useEffect(() => {
    getOrs();
    console.log(orders);
  }, []);

  return (
    <div className="font-outfit">
      <Navbar />
      <div className=" w-9/12 mt-8 mx-auto">
        <div className=" text-lg"> Home &nbsp; &nbsp; Orders</div>
        <div className="YourOrders text-neutral-800 text-4xl font-bold font-['Outfit']  tracking-wider">
          Your Orders
        </div>
        <div className="flex flex-col mt-5">
          {orders && orders.map((item) => <Item key={item.name} item={item} />)}
        </div>
        <Footer />
      </div>
    </div>
  );
};
const Item = ({ item }) => {
  const { name, quantity, price, image } = item;

  return (
    <div className="flex  flex-col md:flex-row mt-4 mb-3 ">
      <div className="pt-3 mx-auto">
        <img src={image} alt="image1"></img>
      </div>
      <div className="flex flex-col  ml-7">
        <div className="text-zinc-800 mx-auto md:ml-5 text-3xl mb-3 mt-2 font-bold font-['Open Sans'] tracking-wider">
          {name}
        </div>
        <div className="flex flex-row">
          <div className="my-auto items-center mx-5">
            <img src={""} alt="icon1"></img>
          </div>
          <div className="w-3/4">
            <span className="text-zinc-800 text-lg font-bold font-['Open Sans']">
              Description: &nbsp;
            </span>
          </div>
        </div>
        <div className="flex flex-row mt-4">
          <div className="my-auto items-center mx-5">
            <img src={""} alt="propimg"></img>
          </div>
          <div className="w-3/4 ">
            <span className="text-zinc-800 text-lg font-bold font-['Open Sans']">
              Date:
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto  my-auto">
        <div className="flex flex-row mb-2 mt-2">
          <span className="text-zinc-800 text-2xl font-normal mr-2 font-['Open Sans']">
            Price:
          </span>
          <span className="text-zinc-800 text-3xl font-extrabold font-['Open Sans']">
            {price}
          </span>
        </div>
        <div className=" w-32  px-4 py-2 bg-black rounded-3xl">
          <div className=" text-white text-base font-semibold font-['Outfit']">
            Cancel Order
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
