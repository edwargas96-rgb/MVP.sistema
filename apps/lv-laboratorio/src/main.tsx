import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "@mvp/ui";
import { brand } from "./brand";
import { seed } from "./seedData";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoot brand={brand} seed={seed} />
  </React.StrictMode>,
);
