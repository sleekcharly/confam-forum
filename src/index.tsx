import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ErrorBoundary from "./components/ErrorBoundary";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// initiate apollo client for graphql
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  // apollo caches all our query results
  cache: new InMemoryCache({
    // disable results from being cached
    resultCaching: false,
  }),
});

root.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ErrorBoundary>{[<App key="App" />]}</ErrorBoundary>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
