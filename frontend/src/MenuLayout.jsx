import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Clock } from 'lucide-react';
import { useRestaurant } from './Context/ResturantContext';

const MenuLayout = () => {
    const { MenuItems, fetchAdminMenu, getLogoUrl } = useRestaurant();
    const cuisineRefs = useRef({});

    useEffect(() => {
        fetchAdminMenu();
    }, []);

    const scrollToCuisine = (cuisineId) => {
        cuisineRefs.current[cuisineId]?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r bg-gray-50 overflow-y-auto flex-shrink-0">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Cuisines</h2>
                    <div className="space-y-2">
                        {MenuItems?.map((cuisine) => (
                            <button
                                key={cuisine._id}
                                onClick={() => scrollToCuisine(cuisine._id)}
                                className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors"
                            >
                                <span className="font-medium">{cuisine.name}</span>
                                <Badge variant="secondary">
                                    {cuisine.items.length}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - All Cuisines */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                    {MenuItems?.map((cuisine) => (
                        <section 
                            key={cuisine._id}
                            ref={el => cuisineRefs.current[cuisine._id] = el}
                            className="scroll-mt-4"
                        >
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold">{cuisine.name}</h2>
                                <p className="text-gray-500">
                                    {cuisine.items.length} {cuisine.items.length === 1 ? 'item' : 'items'} available
                                </p>
                            </div>

                            <div className="space-y-4">
                                {cuisine.items.length === 0 ? (
                                    <Card className="p-4">
                                        <p className="text-gray-500 text-center">No items available in this cuisine</p>
                                    </Card>
                                ) : (
                                    cuisine.items.map((item) => (
                                        <Card key={item._id} className="overflow-hidden">
                                            <div className="flex gap-4 p-4">
                                                <div className="w-32 h-32 flex-shrink-0">
                                                    <img 
                                                        src={getLogoUrl(item.images[0])}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                                            <p className="text-gray-600">{item.title}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {item.type === "Veg" && (
                                                                <Badge className="bg-green-500">
                                                                    <Leaf className="w-3 h-3 mr-1" />
                                                                    Veg
                                                                </Badge>
                                                            )}
                                                            <Badge variant={item.isAvailable ? "success" : "destructive"}>
                                                                {item.isAvailable ? "Available" : "Sold Out"}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 mt-2">{item.description}</p>

                                                    <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-xl font-bold text-orange-500">
                                                                {item.discountedPrice}
                                                            </span>
                                                            {item.discountedPrice < item.sellingPrice && (
                                                                <span className="text-gray-400 line-through">
                                                                    {item.sellingPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        {item.offerDates && (
                                                            <div className="flex items-center text-sm text-gray-500">
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                <span>
                                                                    Offer valid: {formatDate(item.offerDates.start)} - {formatDate(item.offerDates.end)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuLayout;