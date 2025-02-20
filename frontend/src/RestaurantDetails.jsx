import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './components/ui/button';
import { useRestaurant } from './Context/ResturantContext';
import { Skeleton } from "@/components/ui/skeleton";
import RestLayout from './RestLayout';

const RestaurantDetails = () => {
  const { fetchRestaurant, Restaurants, loading } = useRestaurant();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verifyToken = searchParams.get("verify");
  const { hotelName, roomName } = useParams();

  // fetch restaurant and hotel data
  useEffect(() => {
    fetchRestaurant();
  }, []);

  const toSlug = (name) => name.replace(/\s+/g, '-');

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className='mb-8'>
          <h1 className="text-3xl font-bold mb-8">Our Restaurants</h1>
          <RestLayout
            hotelName={hotelName}
            roomName={roomName}
            toSlug={toSlug}
            verifyToken={verifyToken}
          />
        </div>
        <h1 className="text-3xl font-bold mb-8">Featured Restaurants</h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <Skeleton className="h-6 w-40 mt-4" />
                  <Skeleton className="h-4 w-32 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-40 mt-2" />
                  <Skeleton className="h-4 w-32 mt-2" />
                  <Skeleton className="h-4 w-28 mt-2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-32" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(Restaurants) && Restaurants.length > 0 ? (
              Restaurants.map((restaurant) => (
                <Card key={restaurant?._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={restaurant?.image || "/no-image-food-placeholder.webp"}
                      alt={restaurant?.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardTitle className="mt-4 text-lg">{restaurant?.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant?.address || "Address not available"}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{restaurant?.email || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{restaurant?.phone || "Not available"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant?.openingHours?.monday || "Opening hours not available"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => navigate(`/${hotelName}/${roomName}/${toSlug(restaurant?.name)}/menu?restaurantid=${restaurant?._id}&verify=${verifyToken}`)}>
                      View Menu
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No restaurants available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RestaurantDetails;