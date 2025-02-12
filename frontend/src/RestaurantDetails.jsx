import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { restaurants } from '@/data/restaurant-data';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './components/ui/button';

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { hotelName, roomNumber } = useParams();

  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  const handleViewMenu = (restaurantName) => {
    // Navigate to the restaurant's menu while maintaining the hotel and room context
    navigate(`/${hotelName}/${roomNumber}/${toSlug(restaurantName)}/menu`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Featured Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4">{restaurant.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.address}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{restaurant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.openingHours.monday}</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Cuisine: </span>
                  {restaurant.cuisine}
                </div>
                <div>
                  <span className="font-semibold">Price Range: </span>
                  {restaurant.priceRange}
                </div>
                <div>
                  <span className="font-semibold">Rating: </span>
                  {restaurant.rating} / 5
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleViewMenu(restaurant.name)}
              >
                View Menu
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;