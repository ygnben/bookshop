import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./Home.jsx";
// import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://www.googleapis.com/books/v1/graphql",
  uri: "https://www.googleapis.com/books/v1/volumes",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>{/* <App /> */ <Home />}</ApolloProvider>
  </React.StrictMode>
);
