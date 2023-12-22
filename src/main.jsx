import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// import App from "./App.jsx";
import Home from "./features/Home.jsx";
import Detail from "./features/Detail.jsx";
import SignIn from "./features/SignIn.jsx";
import Search from "./components/Search.jsx";
import Favourite from "./features/Favourite.jsx";
import Shopcart from "./features/Shopcart.jsx";
import Checkout from "./features/Checkout.jsx";

import store from "./redux/store.jsx";
// import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const client = new ApolloClient({
  // uri: "https://www.googleapis.com/books/v1/graphql",
  uri: "https://www.googleapis.com/books/v1/volumes",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/Login" element={<SignIn />} />
            <Route path="/Home" element={<Home />} />{" "}
            <Route path="/Search" element={<Search />} />
            <Route path="/Favourite" element={<Favourite />} />
            <Route path="/Shopcart" element={<Shopcart />} />
            <Route path="/Checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

//code for test
// import React from "react";
// import ReactDOM from "react-dom/client";

// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
