const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const productRoute = require("./routes/productRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");
const { protect } = require("./middleware/authMiddleware");
const orderModel = require("./models/orderModel");
const cartModel = require("./models/cartModel");
// const messageRoute=require('./routes/messageRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//product
app.use("/api/products", productRoute);

//cart
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

//chat
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const stripe = require("stripe")(
  "sk_test_51OPPNASI2xzTCAgKyB3xVq4UBqzQhqdtJHSDCYjoUZhDkBQLswl15ZpUVtAcaefzpYIJaLnDjrJ6Qh6f2Eq1R1wH00qbno0VPX"
);

// app.post("/payment", async (req, res) => {
//   try {
//     console.log("i cme here");
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         // const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.price,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `http://localhost:3000/success.html`,
//       cancel_url: `http://localhost:3000/cancel.html`,
//     });
//     console.log(session);
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

app.post("/payment", protect, async (req, res) => {
  try {
    // console.log(process.env.STRIPE_PRIVATE_KEY);
    console.log("hi");
    // const userr = JSON.parse(localStorage.getItem("user"));
    console.log(req.body);

    items = req.body.cartItems;
    console.log(items);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        // const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/failed`,
    });
    console.log(session);
    res.json({ url: session.url });
    try {
      console.log("You came here");
      const cart = await cartModel.findOne({ user: req.user._id });

      if (!cart) {
        throw new Error("Cart not found");
      }
      const orderItems = [];
      for (const cartItem of cart.cartItems) {
        const orderItem = {
          product: cartItem.product,
          quantity: cartItem.quantity,
        };
        orderItems.push(orderItem);
      }
      const order = new orderModel({
        user: cart.user,
        orderItems: orderItems,
      });
      await order.save();
      console.log("Order created from cart");
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle the error appropriately
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
