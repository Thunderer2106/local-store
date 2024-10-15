import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { addtocart } from "../../features/cart/cartSlice";

export const Page = () => {
  const { product } = useSelector((state) => state.product);
  const userr = JSON.parse(localStorage.getItem("user"));
  // const [cartdata, setcartdata] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  var stars = 1.5;
  const [rating, setRating] = useState([
    "/images/full.png",
    "/images/full.png",
    "/images/full.png",
    "/images/full.png",
    "/images/full.png",
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log(data);
      setLoadingChat(false);
      navigate("/chat");
      //   onClose();
    } catch (error) {
      toast.error("Error Fetching chats");
      console.log(error);
    }
  };

  const quantityChange = (event) => {
    if (event.target.value > product.quantity) {
      toast.error("Not sufficient stock left to add");
    } else setQuantity(event.target.value);
  };

  const wishlistChange = () => {
    setWishlist(!wishlist);
  };

  useEffect(() => {
    ratingStars();
  }, [stars]);

  const ratingStars = () => {
    for (let index = 0; index < 5; index++) {
      if (stars > 0.5) {
        stars = stars - 1;
      } else if (stars === 0.5) {
        var updatedItems = [];
        for (let i = 0; i < index; i++) {
          updatedItems[i] = "/images/full.png";
        }
        updatedItems[index] = "/images/half.png";
        for (let i = index + 1; i < 5; i++) {
          updatedItems[i] = "/images/zero.png";
        }
        setRating(updatedItems);
        break;
      } else {
        var updatedItems = [];
        for (let i = 0; i < index; i++) {
          updatedItems[i] = "/images/full.png";
        }
        for (let i = index; i < 5; i++) {
          updatedItems[i] = "/images/zero.png";
        }
        setRating(updatedItems);
        break;
      }
    }
  };

  const handleActiveImage = (event) => {
    // setActive(event.target.getAttribute('id'));
    const buttonId = event.target.id;
    console.log(`Button with ID ${buttonId} was clicked`);
  };
  const addcart = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("product", product.name);
    // formData.append("quantity", Number(product.quantity));

    console.log(userr);
    try {
      await dispatch(
        addtocart({
          user: userr._id, // assuming 'userr' has an '_id' property
          cartItems: [
            {
              product: product._id, // assuming 'product' has an '_id' property
              quantity: product.quantity, // replace with actual quantity value
            },
          ],
        })
      );
      navigate("/cart"); 
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex my-11">
        <div className="w-2/3 mx-11">
          <div className="flex h-1/2 w-full">
            <img src={product.image} className="rounded-md" />
          </div>
        </div>
        <div className=" px-12">
          <div className="outfit-700 text-[32px] ">{product.name}</div>
          <div className="outfit-600 text-[18px] mb-3">{product.price}</div>
          <button onClick={wishlistChange} className="h-10 w-10">
            {wishlist ? (
              <img src="/images/wishlisted.png" alt="wishlist-icon"></img>
            ) : (
              <img src="/images/wishlist.png" alt="wishlist-icon"></img>
            )}
          </button>
          <div className="flex outfit-600 text-[15px] my-3">
            {rating.map((e, index) => (
              <img
                key={index}
                src={e}
                alt="star"
                className="h-5 w-5 mx-1"
              ></img>
            ))}
            <div className="mx-2">{`(${stars}) stars `}</div>
            <div className="outfit-700 mx-2 ">.</div>
            <button className="">10 reviews</button>
          </div>

          <div className="outfit-500 text-[18px] w-[70%] my-5">
            {product.description}.
          </div>
          <div className="outfit-600 text-[16px] mt-3">Quantity</div>
          <div className="border-2 border-black rounded-sm w-9 h-9 my-1">
            <input
              type="number"
              className="border-none w-full h-full text-center"
              placeholder={quantity}
              value={quantity}
              onChange={quantityChange}
            />
          </div>
          <div className="my-7 w-[80%] flex">
            <button
              className="rounded-full border px-20 py-4 outfit-600 bg-[#F6E6CD] my-3 mx-5 shadow-xl text-center"
              onClick={addcart}
            >
              Add to Cart
            </button>
            <button
              className="rounded-full border px-20 py-4 outfit-600 bg-[#F6E6CD] my-3 mx-5 shadow-xl text-center"
              onClick={() => accessChat(product.user)}
            >
              Chat with Seller
            </button>
          </div>
          <button className="rounded-full outfit-600 border bg-black text-white px-10 py-5 w-[70%] shadow-2xl">
            Buy Now
          </button>

          <hr className="border-t-1 border-[#F47726] w-[70%] my-11 " />
          <div className="outfit-600">Details</div>
          <div className="outfit-400 w-[70%] my-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem
            imperdiet. Nunc ut sem vitae risus tristique posuere.
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-black mt-20 mx-10" />
      <div className="outfit-400 text-center my-4">
        &copy; 2023 Local Store, All right reserved
      </div>
    </>
  );
};
