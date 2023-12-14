import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import Home from "./Home.jsx";
import Detail from "./Detail.jsx";
import SignIn from "./features/SignIn.jsx";
import Search from "./Search.jsx";
import Favourite from "./Favourite.jsx";

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
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
