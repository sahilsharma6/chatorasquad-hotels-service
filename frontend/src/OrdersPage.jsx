import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Building } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useHotel } from './Context/HotelContext';
import { useOrder } from './Context/OrderContext';
import { Skeleton } from './components/ui/skeleton';
import DownloadInvoice from './components/DownloadInvoice';

const OrdersPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { hotelName, roomName } = useParams();
    const { fetchHotelByName, HotelDetailsByName, fetchHotelRooms, Rooms } = useHotel();
    const { fetchOrderByRoom, orders } = useOrder();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchHotelByName(hotelName);
        };
        fetchData();
    }, [hotelName]);

    useEffect(() => {
        const fetchRooms = async () => {
            if (HotelDetailsByName?._id) {
                await fetchHotelRooms(HotelDetailsByName._id);
            }
        };
        fetchRooms();
    }, [HotelDetailsByName?._id]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (Rooms?.length > 0 && roomName) {
                const currentRoom = Rooms.find((room) => room.room === roomName);
                if (currentRoom?._id) {
                    await fetchOrderByRoom(currentRoom._id);
                }
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [Rooms, roomName]);

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

    const LoadingSkeleton = () => (
        <Card className="overflow-hidden mb-4">
            <CardHeader className="border-b bg-gray-50">
                <div className="flex justify-between items-start">
                    <div>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-8" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 w-32" />
                    ))}
                </div>
                <div className="border-t pt-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex justify-between items-center mb-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                    <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </>
            );
        }

        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            return (
                <Card className="p-6 text-center text-gray-500">
                    No orders found
                </Card>
            );
        }

        return orders
            .slice()
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map((order) => (
                <Card key={order?._id} className="overflow-hidden hover:shadow-md transition-shadow mb-4">
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
                            <div className="flex items-center gap-2">
                                <Badge className={`${getStatusColor(order?.status)} text-white`}>
                                    {order?.status}
                                </Badge>
                                <DownloadInvoice order={order} />
                            </div>
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
                                            Quantity: {item?.quantity}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between items-center font-bold">
                                    <span>Total</span>
                                    <span>₹{order?.totalPrice?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Orders</h1>
            </div>

            <div className="space-y-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default OrdersPage;