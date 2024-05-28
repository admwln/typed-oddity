import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//Type assertion "as HTMLElement" is used to tell TypeScript that the value is of type HTMLElement.
//Without "as" keyword, TypeScript thinks it could also be null.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
