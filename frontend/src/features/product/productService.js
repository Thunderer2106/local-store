import axios from "axios";

const API_URL = "/api/products";

// Create New Product
const addproduct = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("ee");
  console.log(formData);
  console.log("eee");
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

//get product based on location
const getproduct = async (coordinates) => {
  console.log("location");
  const response = await axios.get("/api/products/getpro", {
    params: { coordinates },
  });
  return ["setProductsLocation", response.data];
};

//get product based on search
const searchproduct = async (parameters) => {
  const response = await axios.get("/api/products/search", {
    params: { parameters },
  });
  return response.data;
};

//get product by id
const getProductById = async (id) => {
  const response = await axios.get("/api/products/getid/" + id);
  return response.data;
};

//get product from home

const getHomeSearch = async (params) => {
  const response = await axios.get("/api/products/gethomesearch", {
    params: { params },
  });
  return response.data;
};

const productService = {
  addproduct,
  getproduct,
  searchproduct,
  getProductById,
  getHomeSearch,
};

export default productService;
