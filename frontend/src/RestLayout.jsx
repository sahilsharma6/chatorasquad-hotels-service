import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Phone } from 'lucide-react';

const RestLayout = () => {
    const AdminResturantData = [
        {
            id: 1,
            name: "Chatora Squad",
            description: "Description 1",
            location: "Location 1",
            contact: "Contact 1",
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Our Restaurants</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AdminResturantData.map((restaurant) => (
                    <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">{restaurant.name}</CardTitle>
                            <CardDescription>{restaurant.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span>{restaurant.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span>{restaurant.contact}</span>
                                </div>
                            </div>
                        </CardContent>
                        
                        <CardFooter>
                            <Link 
                                to='/rest/menu'
                                className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2"
                            >
                                View Menu
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RestLayout;