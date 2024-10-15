const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

//add item to cart
exports.addItemToCart = asyncHandler(async (req, res) => {
  const product = req.body.cartItems[0].product;
  const quantity = req.body.cartItems[0].quantity;
  console.log("i came here");
  console.log(quantity);
  if (!product || !quantity) {
    res.status(400);
    throw new Error("Error in fetching data");
  }

  //check if cart exists for user
  const isCart = await Cart.findOne({ user: req.user._id });
  console.log(isCart);

  //carts exists
  //update cart
  if (isCart) {
    console.log("cart is also present");
    const isItemExists = await isCart.cartItems.find(
      (i) => i.product == product
    );
    // console.log(isItemExists);
    const id = isCart._id;
    console.log("hi");

    //if product in cart update
    // if (isItemExists) {
    //   console.log("item exists bruh");
    //   const updated = await Cart.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       $set: {
    //         cartItems: {
    //           product: isItemExists.product,
    //           quantity: Number(isItemExists.quantity) + Number(quantity),
    //           _id: isItemExists._id,
    //         },
    //       },
    //     },
    //     { new: true }
    //   );

    //   if (updated) {
    //     res.status(200).json({ updated: updated });
    //     console.log(req.user.token);
    //     console.log("updated");
    //   } else {
    //     res.status(400);
    //     throw new Error("Error in updating cart");
    //   }
    // }

    //add new item to cart
    if (isItemExists) {
      console.log("item already exists");
    } else {
      console.log("adding");
      const updated = await Cart.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $push: {
            cartItems: {
              product: product,
              quantity: 1,
            },
          },
        },
        { new: true }
      );
    }
    if (updated) {
      res.status(200).json({ Updated: updated });
      console.log("updated");
    } else {
      res.status(400);
      throw new Error("Error in updating cart");
    }
  }

  //cart not there
  //create new one
  else {
    //create cart and add product
    const cart = await Cart.create({
      user: req.user._id,
      cartItems: { product: product, quantity: 1 },
    });

    if (cart) {
      console.log(cart);
      res.status(200).json({ newcart: cart });
    } else {
      res.status(400);
      throw new Error("Error in creating cart");
    }
  }
});
//get  cart items
exports.getCartItems = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user._id }).populate(
    "cartItems.product",
    "_id name price image quantity "
  );
  if (cart) {
    const cartItemsProducts = cart[0].cartItems.map((cartItem) => ({
      id: cartItem.product._id,
      name: cartItem.product.name,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      image: cartItem.product.image,
    }));
    res.status(200).send(cartItemsProducts);
    // res.status(200).send(cart);
  } else {
    res.status(200).send("no cart");
  }
});
exports.modifyCartItems = asyncHandler(
  async (req, res) => {
    recdata = req.body;
    try {
      console.log("yu came here");
      const cart = await Cart.findOne({ user: req.user._id });

      if (!cart) {
        throw new Error("Cart not found");
      }

      // Update and add items based on productItemsArray
      recdata.forEach((item) => {
        const matchingCartItemIndex = cart.cartItems.findIndex(
          (cartItem) => cartItem.product.toString() === item.id
        );

        if (matchingCartItemIndex !== -1) {
          // Update quantity if product ID matches
          cart.cartItems[matchingCartItemIndex].quantity = item.quantity;
          if (item.quantity <= 0) {
            cart.cartItems.splice(matchingCartItemIndex, 1);
          }
        }
        //  else {
        //   // Add new item if product ID doesn't exist in cart
        //   cart.cartItems.push({
        //     product: item.productId,
        //     quantity: item.quantity,
        //   });
        // }
      });

      // Remove items that are not in productItemsArray
      // cart.cartItems = cart.cartItems.filter((cartItem) => {
      //   const productIdExists = recdata.some(item => item.productId === cartItem.product.toString() && item.quantity > 0);
      // return productIdExists;
      // });

      // Save the updated cart
      await cart.save();

      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  // const cart = await Cart.find({ user: req.user._id }).populate(
  //   "cartItems.product",
  //   "_id name price image quantity "
  // );
  // recdata = req.body;
  // for (let i = 0; i < recdata.length; i++) {
  //   console.log(recdata[i]);
  // }
  //
  // console.log(cart[0]);
);

//  remove cart items
exports.removeCartItems = asyncHandler(async (req, res) => {
  if (!req.body.product) {
    res.status(400);
    throw new Error("no product found");
  }

  const product = req.body.product;

  const updated = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          product: product,
        },
      },
    },
    { new: true }
  );
  if (updated) {
    console.log(req.user.token);
    res.status(200).json({ updated: updated });
  } else {
    res.status(400);
    throw new error("error in deleting");
  }
});
