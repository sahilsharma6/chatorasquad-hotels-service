import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const RestaurantCard = ({ restaurant, onViewMenu }) => {

    const navigate = useNavigate();

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <img
                    src={restaurant?.image || "/no-image-food-placeholder.webp"}
                    alt={restaurant?.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle className="mt-4">{restaurant.name}</CardTitle>
                {restaurant.description && <CardDescription>{restaurant.description}</CardDescription>}
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.location || "Address not available"}</span>
                    </div>
                    {restaurant.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{restaurant.email}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{restaurant.contact || "Not available"}</span>
                    </div>
                    {restaurant.openingHours && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{restaurant.openingHours.monday || "Opening hours not available"}</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter>
                {onViewMenu ? (
                    <Button onClick={onViewMenu}>View Menu</Button>
                ) : (
                    <Button onClick={() => navigate(`/${hotelName}/${roomNumber}/${toSlug(restaurant?.name)}/menu?restaurantid=${restaurant?._id}&verify=${verifyToken}`)}>
                        View Menu
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default RestaurantCard;
