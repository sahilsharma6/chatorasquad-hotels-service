import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User, UtensilsCrossed } from 'lucide-react';

const OrdersPage = () => {
    // Mock order data
    const orders = [
        {
            id: "ORD001",
            restaurantName: "Spice Garden",
            roomNumber: "A-304",
            orderDate: "2025-02-17T14:30:00",
            status: "Delivered",
            total: 45.99,
            items: [
                { name: "Butter Chicken", quantity: 2, price: 15.99 },
                { name: "Garlic Naan", quantity: 3, price: 3.99 },
                { name: "Mango Lassi", quantity: 1, price: 4.99 }
            ]
        },
        {
            id: "ORD002",
            restaurantName: "Italian Delights",
            roomNumber: "B-201",
            orderDate: "2025-02-17T15:45:00",
            status: "Preparing",
            total: 32.50,
            items: [
                { name: "Margherita Pizza", quantity: 1, price: 18.50 },
                { name: "Tiramisu", quantity: 2, price: 7.00 }
            ]
        },
        {
            id: "ORD003",
            restaurantName: "Dragon Wok",
            roomNumber: "C-105",
            orderDate: "2025-02-17T13:15:00",
            status: "In Transit",
            total: 28.99,
            items: [
                { name: "Kung Pao Chicken", quantity: 1, price: 16.99 },
                { name: "Spring Rolls", quantity: 2, price: 5.99 }
            ]
        }
    ];

    const getStatusColor = (status) => {
        const statusColors = {
            'Delivered': 'bg-green-500',
            'Preparing': 'bg-blue-500',
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

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="border-b bg-gray-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {formatDate(order.orderDate)}
                                    </div>
                                </div>
                                <Badge className={`${getStatusColor(order.status)} text-white`}>
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-4">
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <UtensilsCrossed className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">{order.restaurantName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>Room {order.roomNumber}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>Estimated Delivery: 30-45 mins</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-600">{item.quantity}x</span>
                                                <span>{item.name}</span>
                                            </div>
                                            <span className="text-gray-600">
                                                {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t mt-4 pt-4">
                                    <div className="flex justify-between items-center font-bold">
                                        <span>Total</span>
                                        <span>{order.total.toFixed(2)}</span>
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