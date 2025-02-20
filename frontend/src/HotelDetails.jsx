import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useHotel } from "./Context/HotelContext";
import { MapPin, Hotel, Phone, CheckCircle, Mail } from "lucide-react";
import { Button } from "./components/ui/button";
import { Skeleton } from "./components/ui/skeleton";

const HotelDetails = () => {
  const { fetchHotelById, fetchHotelRooms, HotelDetails, Rooms, loading } = useHotel();
  const { hotelName } = useParams();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const hotelId = searchParams.get("hotelId");
  
  useEffect(() => {
    if (hotelId) {
      fetchHotelById(hotelId);
      fetchHotelRooms(hotelId);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <Skeleton className="h-40 w-full mb-3" />
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-8 w-32 mt-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold capitalize">{HotelDetails?.name || "Unnamed Hotel"}</h1>
          <Hotel className="h-8 w-8 text-gray-600" />
        </div>

        <div className="flex items-center text-lg text-gray-700">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>{HotelDetails?.isValid ? "Verified Hotel" : "Not Verified"}</span>
        </div>

        <div className="mt-4 text-gray-600">
          <p className="flex items-center">
            <Phone className="h-5 w-5 mr-2" /> {HotelDetails?.phoneNo || "Not Available"}
          </p>
          <p className="flex items-center mt-2">
            <MapPin className="h-5 w-5 mr-2" /> {HotelDetails?.address || "No Address Provided"}
          </p>
          <p className="flex items-center mt-2">
            <Mail className="h-5 w-5 mr-2" /> {HotelDetails?.email || "No City Provided"}
          </p>
        </div>

        <p className="mt-4 text-gray-500">{HotelDetails?.description || "No description available."}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Rooms?.length > 0 ? (
              Rooms?.map((room) => (
                <div key={room?._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={room?.image || '/no-image-food-placeholder.webp'} alt={room?.type} className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-bold">Room: {room?.room}</h3>
                  <Link to={`/${hotelName}/${room?.room}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Rooms available.</p>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;