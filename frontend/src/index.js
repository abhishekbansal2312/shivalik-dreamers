import React from "react";
import ReactDOM from "react-dom/client"; // Change here for React 18 and later
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./provider/AuthProvider"; // Path to your AuthProvider
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element
root.render(
  <Router>
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </AuthProvider>
  </Router>
);
