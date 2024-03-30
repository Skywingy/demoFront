import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";
import "antd/dist/antd.css";
import App from "./layouts/App";
import Auth from "./layouts/Auth";
import AuthProvider from "./utils/auth";
import axios from "axios";
import { API_ROOT } from "./const";
axios.defaults.baseURL = API_ROOT;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Suspense fallback={<Spin />}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="auth/login" />} />
            <Route path="auth" element={<Auth />}>
              {/* <Route path="forget" element={<Forget />} /> */}
              <Route path="login" element={<Auth />} />
              <Route path="logout" element={<Auth from="inside" />} />
              {/* <Route path="recover" element={<Recover />} /> */}
              {/* <Route path="register" element={<Register />} /> */}
            </Route>
            <Route path="user/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </React.StrictMode>
  </BrowserRouter>
);
