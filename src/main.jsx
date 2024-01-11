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
import SignUp from "./features/SignUp.jsx";

import { setContext } from "@apollo/client/link/context";

// import { ApolloClient, createHttpLink } from "@apollo/client/core";

import store from "./redux/store.jsx";
// import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("idToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

// const client = new ApolloClient({
//   // uri: "https://www.googleapis.com/books/v1/graphql",
//   uri: "https://www.googleapis.com/books/v1/volumes",
//   cache: new InMemoryCache(),
// });

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
            <Route path="/SignUp" element={<SignUp />} />
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
