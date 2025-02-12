import React from "react";
import { useParams, Link } from "react-router-dom";
import { hotels } from "@/data/hotel-data";
import { rooms } from "@/data/rooms-data";
import { MapPin, Hotel, Phone, CheckCircle } from "lucide-react";
import { Button } from "./components/ui/button";

const HotelDetails = () => {
  const { hotelName } = useParams();
  const formattedName = hotelName.replace(/-/g, " ");
  const hotel = hotels.find((h) => h.name.toLowerCase() === formattedName.toLowerCase());

  if (!hotel) {
    return <div className="container mx-auto p-6 text-center text-red-500">Hotel not found.</div>;
  }

  // Filter rooms for this hotel
  const hotelRooms = rooms.filter((room) => room.hotelId === hotel.id);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <Hotel className="h-8 w-8 text-gray-600" />
        </div>

        <div className="flex items-center text-lg text-gray-700">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span>Verified Hotel</span>
        </div>

        <div className="mt-4 text-gray-600">
          <p className="flex items-center">
            <Phone className="h-5 w-5 mr-2" /> {hotel.phoneNo}
          </p>
          <p className="flex items-center mt-2">
            <MapPin className="h-5 w-5 mr-2" /> {hotel.location}
          </p>
        </div>

        <p className="mt-4 text-gray-500">{hotel.description || "No description available."}</p>

        {/* Rooms Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelRooms.length > 0 ? (
              hotelRooms.map((room) => (
                <div key={room.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img src={room.image} alt={room.type} className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-bold">{room.type} - Room {room.number}</h3>
                  <p className="text-sm text-gray-600">Capacity: {room.capacity} persons</p>
                  <p className="text-sm text-gray-600">Price: ₹{room.price}</p>
                  <Link to={`/${hotelName}/${room.number}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No rooms available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
