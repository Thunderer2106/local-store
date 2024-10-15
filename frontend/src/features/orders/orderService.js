import axios from "axios";

const API_URL = "/api/orders";

//add to orders

const transfertoorders = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};


//transfer orders

const getorders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/getOrders", config);
  return response.data;
};



const orderService = {
  transfertoorders,
  getorders,
};

export default orderService;
