import React from "react";
import ReactDOM from "react-dom/client";
import MapComponent from "./components/mapComponent";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MapComponent/>
  </React.StrictMode>
);