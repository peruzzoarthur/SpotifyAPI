import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container as Element);

async function enableApiMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

enableApiMocking().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
