const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  //productName: "",
  // productCategory: "",
  // quantityStock: "",
  // sellingPrice: "",
  // description: "",
  // images: [],
  // maxDistance:"",
  const {
    productName,
    productCategory,
    quantityStock,
    sellingPrice,
    description,
    images,
    longitude,
    latitude,
    maxDistance,
  } = req.body;
  console.log('req.body');

  if (
    !productName ||
    !productCategory ||
    !quantityStock ||
    !sellingPrice ||
    !description ||
    !maxDistance
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  if (!longitude || !latitude) {
    res.status(400);
    throw new Error("Please provide location");
  }
  if (!images) {
    console.log("please add image");
    res.status(400);
    throw new Error("Please provide image");
  }
  console.log("added succesfully");
  const product = await Product.create({
    user: req.user.id,
    name: productName,
    category: productCategory,
    quantity: quantityStock,
    price: sellingPrice,
    description,
    // address,
    coordinates: [longitude, latitude],
    longitude,
    latitude,
    image: images,
    maxDistance,
  });

  res.status(201).json(product);
});

//get products filtered
const getProducts = asyncHandler(async (req, res) => {
  //receving parameters as single array

  const longitude = req.query.coordinates[0];
  const latitude = req.query.coordinates[1];
  const maxDistance = req.query.coordinates[2];
  const search = req.query.coordinates[3];

  if (longitude && latitude && maxDistance && search) {
    console.log(req.query.coordinates);

    try {
      const results = await Product.find(
        { $text: { $search: `"${search}"` } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec();
      // console.log(results);

      const products = await Product.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            distanceField: "distance",
            maxDistance: parseFloat(maxDistance),
            minDistance: 0,
            spherical: true,
          },
        },
      ]);

      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
      }

      // Assuming there's an array named 'results' to compare with
      const filteredProducts = products.filter((product) => {
        const filterBySearch = results.filter(
          (i) => i._id.toString() === product._id.toString()
        );

        if (filterBySearch.length !== 0) {
          const distance = calculateDistance(
            latitude,
            longitude,
            filterBySearch[0].coordinates[1],
            filterBySearch[0].coordinates[0]
          );
          console.log(distance);
          return distance <= product.maxDistance;
        }
      });

      res.status(200).json(filteredProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  if (search && (!latitude || !longitude || !maxDistance)) {
    // if (search){
    console.log("running");
    try {
      const results = await Product.find(
        { $text: { $search: `"${search}"` } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec();

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  if (latitude && longitude && maxDistance && !search) {
    Product.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: parseFloat(maxDistance),
          minDistance: 0,
          spherical: true,
        },
      },
    ])
      .then((products) => {
        //filtering on range set by seller
        const filteredProducts = products.filter((product) => {
          return product.maxDistance <= maxDistance;
        });
        res.status(200).json(filteredProducts);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve products" });
      });
  }
});

//get products from Home
const getProductsHome = asyncHandler(async (req, res) => {
  //receving parameters as single array
  const search = req.query.params[0];
  if (search) {
    try {
      const results = await Product.find(
        { $text: { $search: `"${search}"` } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec();

      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
});

//fetching all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const all = await Product.find();
    res.status(200).json({ products: all });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get by category
const filterByCat = asyncHandler(async (req, res) => {
  if (!req.body.cat) {
    res.status(400);
    throw new Error("No category found");
  }
  const cat = req.body.cat;

  try {
    const products = await Product.find({ category: cat });
    res.status(200).json({ products: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(500).json({ error: "error fetching products" });
  }
});

module.exports = {
  addProduct,
  getProducts,
  getAllProducts,
  filterByCat,
  getProductById,
  getProductsHome,
};
