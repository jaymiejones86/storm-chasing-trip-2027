import React from "react";
import { createRoot } from "react-dom/client";
import StormChasingCountdown from "./StormChasingCountdown.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StormChasingCountdown />
  </React.StrictMode>,
);
