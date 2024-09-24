// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App 컴포넌트를 불러옴

const root = ReactDOM.createRoot(document.getElementById("root")); // public/index.html에 있는 root div에 렌더링
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
