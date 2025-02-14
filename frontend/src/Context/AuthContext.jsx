// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";

import apiClient from "../services/ApiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tok,setTok]=useState(null)
  const location = useLocation();
  const navigate = useNavigate()
  const param = useParams(); 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (!token) {
      console.error("No token found in URL");
      setLoading(false); // Stop loading since there's no token
      return;
    }
    console.log(location.pathname.split('/')[1]);
    
        const response = await apiClient.post("user/auth/verify-token", { token,hotel:location.pathname.split('/')[1]});
        if (response.data) {
          console.log(response.data);
          let hotelId=response.data.user.userId
          hotelId.hotelId=response.data.user._id
          setUser(hotelId);
          setTok(response.data.tok)
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [location.search]);

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading,tok }}
    >
      {children}
    </AuthContext.Provider>
  );
};
