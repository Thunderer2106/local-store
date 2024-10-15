# Local Store

Local Store is a web application designed to help users find products based on their location. This platform aims to support small-scale businesses, artists, and creators who produce products as a side income or passion. By encouraging local purchases, Local Store fosters a community-driven economy and promotes creativity.

## Live

[Check it out](https://mernappbrad.herokuapp.com/) 

## Features

- **Location-Based Product Discovery**: Users can find products near their location, helping local sellers gain visibility.
- **Real-Time Chat**: WebSocket-based chat allows seamless communication between buyers and sellers.
- **Secure Payments**: Integrated Stripe payment gateway to handle payments securely.
- **User Authentication**: JWT-based authentication system ensures secure user sessions.
- **Efficient State Management**: Uses Redux Toolkit to manage global state across the application.
- **Small Businesses & Artists Support**: Focuses on giving a platform to small business owners and creators to list and sell their products.

## Tech Stack

- **Frontend**: React.js for building the user interface and ensuring smooth user experience.
- **Backend**: Node.js and Express.js for server-side logic and API endpoints.
- **Database**: MongoDB for storing user, product, and transaction data.
- **WebSockets**: Real-time chat feature between buyers and sellers using WebSockets.
- **Payments**: Stripe for handling payments and transactions.
- **State Management**: Redux Toolkit for efficient global state management across components.
- **Authentication**: JSON Web Token (JWT) for secure authentication and session handling.


## Getting Started
To get started with the Personal Finance Tracker, follow these steps:

1. Clone the repository.
   ```
   git clone https://github.com/Thunderer2106/local-store.git
   cd local-store
   ```
3. Install the required dependencies both in the backend and frontend folder:
  ```
npm install
  ```
5. Create a .env file in the root directory and make sure you do these changes:<br>
   ```
   NODE_ENV = development
   PORT = 
   JWT_SECRET = 
   MONGO_URI=
   ```
6. Run the application: `npm run dev` from the root directory
7. Access the application in your web browser at `http://localhost:3000`


