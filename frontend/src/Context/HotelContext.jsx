import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/services/ApiClient';


const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [HotelDetails, setHotelDetails] = useState([]);
  const [HotelDetailsByName, setHotelDetailsByName] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // Fetch all validated hotels
  const fetchValidatedHotels = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/hotel/all-hotels');
      setHotels(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single hotel details
  const fetchHotelById = async (hotelId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/hotel/${hotelId}`);
      console.log(response.data);
      
      // const formattedHotels = Array.isArray(response.data) ? response.data : [response.data];
      setHotelDetails(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelByName = async (hotelName) => {
    console.log(hotelName);
    
    try {
      setLoading(true);
      const response = await apiClient.get(`/hotel/hotelName/${hotelName}`);
      console.log(response.data);
      
      // const formattedHotels = Array.isArray(response.data) ? response.data : [response.data];
      setHotelDetailsByName(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotel rooms
  const fetchHotelRooms = async (hotelId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/hotel/rooms/${hotelId}`);
      setError(null);
      setRooms(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear error state
  const clearError = () => {
    setError(null);
  };


  const VerifyPassword = async (hotelId, password) => {
    try {
      setLoading(true);
      const response = await apiClient.post(`/hotel/checkpassword/${hotelId}`, { password });
      console.log(response.data);
      
      setIsPasswordVerified(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    hotels,
    loading,
    error,
    fetchValidatedHotels,
    fetchHotelById,
    fetchHotelRooms,
    clearError,
    HotelDetails,
    Rooms,
    VerifyPassword,
    fetchHotelByName,
    HotelDetailsByName
  };

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  );
};

// Custom hook to use the hotel context
export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};