import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Building } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useHotel } from './Context/HotelContext';
import { useOrder } from './Context/OrderContext';
import { Skeleton } from './components/ui/skeleton';

const OrdersPage = () => {
    const { hotelName, roomName } = useParams();
    const { fetchHotelByName, HotelDetailsByName, fetchHotelRooms, Rooms } = useHotel();
    const { fetchOrderByRoom, orders, loading } = useOrder();

    useEffect(() => {
        fetchHotelByName(hotelName);
    }, [hotelName]);

    useEffect(() => {
        if (HotelDetailsByName?._id) {
            fetchHotelRooms(HotelDetailsByName._id);
        }
    }, [HotelDetailsByName?._id]);

    useEffect(() => {
        if (Rooms?.length > 0 && roomName) {
            const currentRoom = Rooms.find((room) => room.room === roomName);
            if (currentRoom?._id) {
                fetchOrderByRoom(currentRoom._id);
            }
        }
    }, [Rooms, roomName]);

    console.log(orders);

    const getStatusColor = (status) => {
        const statusColors = {
            'Delivered': 'bg-green-500',
            'Processing': 'bg-blue-500',
            'In Transit': 'bg-yellow-500',
            'Cancelled': 'bg-red-500'
        };
        return statusColors[status] || 'bg-gray-500';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    if (loading || !orders?.length) {
        return (
            <>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="max-w-4xl mx-auto p-6">
                        <Skeleton className="h-10 w-64 mb-4" />
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-24 w-full mb-4" />
                        <Skeleton className="h-8 w-40" />
                    </div>
                ))}
            </>
        );
    }

    if (!orders?.length) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Orders</h1>
                <Card className="p-6 text-center text-gray-500">
                    No orders found
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Orders</h1>
            </div>

            <div className="space-y-4">
                {orders
                    ?.slice() // Create a shallow copy to avoid mutating the original array
                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort latest first
                    .map((order) => (
                        <Card key={order?._id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardHeader className="border-b bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg">
                                            Order #{order?._id?.slice(-6)}
                                        </CardTitle>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {formatDate(order?.orderDate)}
                                        </div>
                                    </div>
                                    <Badge className={`${getStatusColor(order?.status)} text-white`}>
                                        {order?.status}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">{order?.hotelId?.name || 'Unknown Hotel'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span>{order?.roomId?.room || 'Unknown Room'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span>Order {order?.status}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="space-y-2">
                                        {order?.orderItems?.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600">{item?.quantity}x</span>
                                                    <span>
                                                        {item?.menuItem?.name || 'Item Unavailable'}
                                                    </span>
                                                </div>
                                                <span className="text-gray-600">
                                                    {item?.menuItem?.price
                                                        ? (item.menuItem.price * item.quantity).toFixed(2)
                                                        : 'N/A'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t mt-4 pt-4">
                                        <div className="flex justify-between items-center font-bold">
                                            <span>Total</span>
                                            <span>{order?.totalPrice?.toFixed(2) || '0.00'}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default OrdersPage;
