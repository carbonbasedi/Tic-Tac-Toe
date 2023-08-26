import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Theme>
    <App />
  </Theme>
);
