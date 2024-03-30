import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GetFromStorage, RemoveFromStorage, SaveToStorage } from "./storage";
import { useLocalStorage } from "./useLocalStorage";

window.addEventListener("storage", function (event) {
  if (event.key === "logout-event") {
    window.location = "/auth/login";
    window.close();
  }
});

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {

  
  console.log("🚀 ~ file: auth.js ~ line 75 ~ AuthProvider ~ AuthProvider");
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  

  const login = async (instance) => {
    setInstance(instance);
    console.log("what's instance--------------------", instance);
    navigate("/user");
  };

  const logout = () => {
    console.log("🚀 ~ file: auth.js ~ line 33 ~ logout ~ logout");
    setInstance();
  };

  
  const setInstance = (instance) => {
    console.log('set instance----', instance);
    if (instance) {
      SaveToStorage("user", JSON.stringify(instance));
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + instance.token;
      setUser(instance.user);

    } else {
      RemoveFromStorage("user");
      setUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    console.log('auth use effect')
    const user = GetFromStorage("user");
    setInstance(user ? JSON.parse(user) : undefined);
  }, []);

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {return useContext(AuthContext)};
export default AuthProvider;