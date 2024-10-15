import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import { TextProvider } from "./Context/searchProvider";
// import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <Router>
    <ChatProvider>
      <TextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TextProvider>
    </ChatProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
