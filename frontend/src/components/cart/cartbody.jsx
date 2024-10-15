import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getcartitems, modifycart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import Footer from "./Footer";
import Navbar from "../common/navbar";
const Item = ({ item, handleRemoveFromCart, handleDeleteItem }) => {
  const [quantity, setQuantity] = useState(Number(item.quantity));
  const handleIncrement = () => {
    // if (quantity < item.existquant) {
    setQuantity(quantity + 1);
    handleRemoveFromCart(item, true, item.price);
    // }
  };

  const handleDecrement = () => {
    if (quantity === 0) {
      handleDeleteItem(item);
      return;
    }
    setQuantity(Math.max(0, quantity - 1));
    handleRemoveFromCart(item, false, item.price);
  };

  // return (
  //   <div className=" w-full justify-start items-center border border-black border-opacity-5  gap-4 inline-flex">
  //     <div className="">
  //       <img src={item.image} alt={item.title} />
  //     </div>
  //     <div className=" h-36 flex flex-row justify-between w-full items-center ">
  //       <div className=" h-28 flex flex-col  items-start ">
  //         <div className=" flex-col  text-black justify-start items-start gap-1 flex">
  //           <div className=" text-xl font-bold ">{item.title}</div>
  //           <div className=" flex flex-col justify-start items-start gap-1 ">
  //             <div className=" text-sm font-normal ">
  //               Size: <span className=" text-opacity-60  ">{item.size}</span>
  //             </div>
  //             <div className="  text-sm font-normal ">
  //               Color: <span className=" text-opacity-60  ">{item.color}</span>
  //             </div>
  //           </div>
  //           <div className=" text-2xl font-bold ">${item.price}</div>
  //         </div>
  //       </div>
  //       <div className="  flex flex-col justify-between items-end   ">
  //         <div className="mb-10" onClick={() => handleDeleteItem(item)}>
  //           Delete
  //         </div>
  //         <div className="px-5 py-2 bg-zinc-100 text-2xl rounded-3xl justify-center my-auto items-center gap-5 flex flex-row ">
  //           <div onClick={handleDecrement}>-</div>
  //           <div className=" text-black text-xl font-medium ">{quantity}</div>
  //           <div onClick={handleIncrement}>+</div>
  //         </div>
  //       </div>
  //     </div>
  //     {/* <p>Subtotal: ${price.toFixed(2)}</p> */}
  //   </div>
  // );
  return (
    <div className=" w-full justify-start items-center border border-black border-opacity-5  gap-4 inline-flex">
      <div className="">
        <img src={item.image} alt={item.name} className="" />
      </div>
      <div className=" h-36 flex flex-row justify-between w-full items-center ">
        <div className=" h-28 flex flex-col  items-start ">
          <div className=" flex-col  text-black justify-start items-start gap-1 flex">
            <div className=" text-xl font-bold ">{item.name}</div>
            <div className=" flex flex-col justify-start items-start gap-1 ">
              {/* <div className=" text-sm font-normal ">
                Size: <span className=" text-opacity-60  ">{item.size}</span>
              </div> */}
              {/* <div className="  text-sm font-normal ">
                Color:{" "}
                <span className=" text-opacity-60  ">{item.category}</span>
              </div> */}
            </div>
            <div className=" text-2xl font-bold ">{item.price} rs</div>
          </div>
        </div>
        <div className="  flex flex-col justify-between items-end   ">
          <div className="mb-10" onClick={() => handleDeleteItem(item)}>
            Delete
          </div>
          <div className="px-5 py-2 bg-zinc-100 text-2xl rounded-3xl justify-center my-auto items-center gap-5 flex flex-row ">
            <div onClick={handleDecrement}>-</div>
            <div className=" text-black text-xl font-medium ">{quantity}</div>
            <div onClick={handleIncrement}>+</div>
          </div>
        </div>
      </div>
      {/* <p>Subtotal: ${price.toFixed(2)}</p> */}
    </div>
  );
};

const ShoppingCart = () => {
  const pay = () => {
    console.log("here");
    console.log(cartItems);
    fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token 
      },
      body: JSON.stringify({
        // items: [
        //   { id: 1, quantity: 3 },
        //   { id: 2, quantity: 1 },
        // ],
        cartItems,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth);

  console.log("hiiiiiiiiiiiiii");
  console.log(user);
  console.log("hiiiiiiiiiiiiii");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([
  //   {
  //     title: "T-Shirt",
  //     price: 19.99,
  //     desc: "A comfy and stylish t-shirt with a vintage aesthetic.",
  //     date: "2023-12-06",
  //     image: "/images/Tshirt.png",
  //     color: "Black",
  //     size: "M",
  //     quantity: 2,
  //     existquant: 4,
  //   },
  //   {
  //     title: "Jeans",
  //     price: 24.99,
  //     desc: "A pair of durable and comfortable jeans for everyday wear.",
  //     date: "2023-12-06",
  //     image: "/images/Jeans1.png",
  //     color: "Blue",
  //     size: "32",
  //     quantity: 1,
  //     existquant: 3,
  //   },
  //   {
  //     title: "Sneakers",
  //     price: 39.99,
  //     desc: "A stylish pair of sneakers with a modern design.",
  //     date: "2023-12-06",
  //     image: "/images/Shirt.png",
  //     color: "White",
  //     size: "10",
  //     quantity: 3,
  //     existquant: 5,
  //   },
  // ]);
  let p = 0;
  const [cartItems, setCartItems] = useState(items);
  useEffect(() => {
    fetchData();
  }, []);
  let i = 1;
  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }

    // Calculate total immediately on page load
    setTotal(
      items.reduce(
        (acc, item) =>
          Number(acc) + Number(Number(item.price) * Number(item.quantity)),
        0
      )
    );
    setCartItems(items);
    // console.log(i++);
    // console.log(items);
    // console.log(cartItems);

    // console.log(cartItems);

    // Fetch data from the server, but don't wait for it to update the total
  }, [items]);

  function fetchData() {
    dispatch(getcartitems());

    // Update cartItems after fetching data
  }
  // useEffect(() => {
  //   let p=0;
  //   if (isError) {
  //     toast.error(message);
  //     console.log(message);
  //   }
  //   fetchData();
  //   setCartItems(items);
  //   console.log(items);
  //   let tot = 0;
  //   setTotal(
  //       items.reduce(
  //         (acc, item) =>
  //           Number(acc) + Number(Number(item.price) * Number(item.quantity)),
  //         0
  //       )
  //     );
  //   console.log(tot);
  //   setTotal(tot);

  // // async function fetchData() {
  // //   await dispatch(getcartitems());

  // // }
  // // useEffect(() => {
  // //   let p=0;
  // //   if (isError) {
  // //     toast.error(message);
  // //     console.log(message);
  // //   }
  // //   fetchData();
  // //   setCartItems(items);
  // //   console.log(items);
  // //   let tot = 0;

  // //   for (let i = 0; i < items.length; i++) {
  // //     console.log(items[i].price);
  // //     console.log(items[i].quantity);
  // //     const price = Number(items[i].price) * Number(items[i].quantity);
  // //     tot = tot + price;
  // //   }
  // //   console.log(tot);
  // //   setTotal(tot);

  //   // setTotal(tot);
  //   // setTotal(
  //   //   items.reduce(
  //   //     (acc, item) =>
  //   //       Number(acc) + Number(Number(item.price) * Number(item.quantity)),
  //   //     0
  //   //   )
  //   // );
  //   // return () => {
  //   //   dispatch(reset());
  //   // };
  // }, []);
  async function submit() {
    console.log(cartItems);
    await dispatch(modifycart(cartItems));
    pay();
  }

  const [total, setTotal] = useState();

  const handleRemoveFromCart = (item, isIncrement, price) => {
    const updatedCartItems = cartItems.filter((i) => i.name !== item.name);
    console.log(updatedCartItems);
    if (isIncrement) {
      updatedCartItems.push({ ...item, quantity: Number(item.quantity) + 1 });
      setTotal(Number(total) + Number(price));
    }
    // else if (item.quantity === 1) {
    //   return; // Prevent removing item if quantity is 1 and decrementing
    // }
    else {
      updatedCartItems.push({ ...item, quantity: Number(item.quantity) - 1 });
      setTotal(Number(total) - Number(price));
    }
    // console.log(cartItems);
    setCartItems(updatedCartItems);
    // // console.log(cartItems);
    console.log(updatedCartItems);

    // console.log(cartItems);
  };

  const handleDeleteItem = (item) => {
    const updatedCartItems = cartItems.filter((i) => i !== item);
    setTotal(Number(total) - Number(item.price) * Number(item.quantity));
    setCartItems(updatedCartItems);
  };
  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <div>
      <Navbar />
      <div className="w-10/12 mx-auto">
        <div className="YourOrders text-neutral-800 text-4xl font-bold font-['Outfit']  tracking-wider">
          Your Cart
        </div>
        <div className="flex flex-row mt-10">
          <div className="flex flex-col w-1/2">
            {" "}
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <Item
                  key={item.name}
                  item={item}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleDeleteItem={handleDeleteItem}
                />
              ))
            )}
          </div>

          <div className=" w-1/3  px-6 py-5 rounded-2xl border border-black border-opacity-10 flex flex-col justify-start items-start gap-6 ml-10 ">
            <div className=" text-black text-2xl font-bold ">Order Summary</div>
            <div className=" w-full h-7 text-black flex flex-row justify-between items-center ">
              <div className=" text-opacity-60 text-xl font-normal ">Total</div>
              <div className="text-xl font-bold ">{total} rs</div>
            </div>
            <div className="flex w-full flex-row">
              <input
                className="Frame3 w-2/3 h-12 px-4 py-3  text-black text-opacity-40 bg-zinc-100 text-base font-normal  rounded-3xl "
                placeholder="Add promo code"
              >
                {/* promo icon div */}
              </input>
              <div className="ml-2 w-1/3 h-12 px-4 py-3 bg-black rounded-3xl text-white text-base font-medium flex justify-center ">
                Apply
              </div>
            </div>
            <div className="Frame14 w-full h-14 px-14 py-4 bg-black rounded-3xl gap-2 flex cursor-pointer justify-center items-center ">
              <div
                className="GoToCheckout text-white text-base font-medium "
                onClick={submit}
              >
                Go to Checkout
              </div>

              <img src="/images/arrow.svg" alt="arrow"></img>
            </div>
            <button onClick={pay}>pay</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingCart;

// import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// const Cartbody = () => {
//     const [products, setProducts] = useState([
//         {
//             name: "Gradient Graphic T-Shirt",
//             img: '/images/product-sample.jpg',
//             detail: 'm',
//             quantity: 1,
//             price: 55,

//         },
//         {
//             name: "Gradient Graphic T-Shirt",
//             detail: 'm',
//             img: '/images/product-sample.jpg',

//             quantity: 2,
//             price: 55,

//         },
//         {
//             name: "Gradient Graphic T-Shirt",
//             detail: 'm',
//             img: '/images/product-sample.jpg',

//             quantity: 2,
//             price: 55,

//         }
//     ])
//     const [total, setTotal] = useState(0)
//     useEffect(() => {
//         let sum = 0;

//         for (let i = 0; i < products.length; i++) {
//             const price = products[i].price * products[i].quantity;
//             sum = sum + price;

//         }

//         setTotal(sum)

//     }, []);

//     return (
//         <div className='mx-24'>
//             <div className='outfit-500'><span className='text-[#888]'>Home</span> <span style={{ fontSize: '16px' }}> <FontAwesomeIcon icon={faAngleRight} size="sm" /> </span> <span>Cart</span> </div>
//             <div className='outfit-600 text-[32px]'>Your Cart</div>
//             <div className='flex my-5'>
//                 <div className='border rounded-lg border-[#888]'>
//                     {
//                         products.map((item, index) => (
//                             <>

//                                 <div className='flex my-5'>
//                                     <div className='mx-4'>
//                                         <img src={item.img} alt="img" className='rounded-md h-24 w-[100%]' />

//                                     </div>
//                                     <div className='mx-1 flex justify-between'>
//                                         <div>
//                                             <div className='outfit-600'> {item.name} </div>
//                                             <div className='outfit-400 text-[#888]'> {item.detail} </div>
//                                             <div className='my-2 outfit-600 '>{item.price} </div>

//                                         </div>
//                                         <div className='flex flex-col'>
//                                             <div className='flex justify-end flex-grow mx-2'>
//                                                 <FontAwesomeIcon icon={faTrash} />
//                                             </div>
//                                             <div className='rounded-full bg-[#F0F0F0] '>
//                                                 <div className='px-2 py-2'>
//                                                     <FontAwesomeIcon icon={faMinus} className='px-2' />
//                                                     <span className='mx-3 outfit-400 text-[14px]'>{item.quantity}</span>
//                                                     <FontAwesomeIcon icon={faPlus} className='px-2' />

//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div>
//                                     </div>

//                                 </div>
//                                 {index !== products.length - 1 &&
//                                     <hr className="border-t-1 border-[#888] mx-5" />
//                                 }

//                             </>

//                         ))
//                     }

//                 </div>
//                 <div className='rounded-xl border border-[#888] mx-7 w-[40%] h-[50%] my-5 py-5 px-5'>
//                     <div className='outfit-600'>Order Summary</div>
//                     <div className='flex justify-between my-3'>
//                         <div className='text-[#888]'>Total Items</div>
//                         <div className='outfit-600'>{products.length}</div>
//                     </div>
//                     <div className='flex justify-between my-3'>
//                         <div className='text-[#888]'>Total Price</div>
//                         <div className='outfit-600'>{total}</div>

//                     </div>
//                     <hr className="border-t-1 border-[#888] " />
//                     <button className='rounded-full outfit-500 border bg-black text-white px-10 py-5 w-[100%] my-2'>Checkout</button>

//                 </div>
//             </div>
//             <hr className="border-t-1 border-black mt-24 mx-5" />
//             <div className='outfit-400 text-center my-4'>&copy; 2023 Local Store, All right reserved</div>

//         </div>
//     )
// }

// export default Cartbody;
