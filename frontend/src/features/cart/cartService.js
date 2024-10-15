import axios from "axios";

const API_URL = "/api/cart";

//add to cart
const addtocart = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

//remove from cart
const removefromcart = async (formData) => {
  const response = await axios.put(API_URL, formData);
  return response.data;
};

//get cart items

const getcartitems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/getCartItems", config);
  return response.data;
};
const modifycart = async (formData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL+"/modifyCart", formData,config);
  return response.data;
};


const cartService = {
  addtocart,
  removefromcart,
  getcartitems,
  modifycart
};

export default cartService;
