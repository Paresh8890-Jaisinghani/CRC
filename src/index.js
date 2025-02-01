import React from "react";
import ReactDOM from "react-dom/client"; // Note the import change
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create the root element
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
