import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Building } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useHotel } from './Context/HotelContext';
import { useOrder } from './Context/OrderContext';
import { Skeleton } from './components/ui/skeleton';
import DownloadInvoice from './components/DownloadInvoice';

import companyLogo from '/company_logo.png';

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
      'Cancelled': 'bg-red-500',
    };
    return statusColors[status] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const LoadingSkeleton = () => (
    <Card className="overflow-hidden mb-4 w-full">
      <CardHeader className="border-b bg-gray-50 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="w-full sm:w-auto">
            <Skeleton className="h-6 w-full sm:w-32 mb-2" />
            <Skeleton className="h-4 w-full sm:w-24" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 p-4 sm:p-6">
        <div className="flex flex-col gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-full sm:w-32" />
          ))}
        </div>
        <div className="border-t pt-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-3/4 sm:w-48" />
              <Skeleton className="h-4 w-1/4 sm:w-24" />
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
        <Card className="p-4 sm:p-6 text-center text-gray-500 w-full">
          No orders found
        </Card>
      );
    }

    return orders
      .slice()
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .map((order) => (
        <Card
          key={order?._id}
          className="overflow-hidden hover:shadow-md transition-shadow mb-4 w-full"
        >
          <CardHeader className="border-b bg-gray-50 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="w-full sm:w-auto">
                <CardTitle className="text-base sm:text-lg">
                  Order #{order?._id?.slice(-6)}
                </CardTitle>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  {formatDate(order?.orderDate)}
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
                <Badge className={`${getStatusColor(order?.status)} text-white text-xs sm:text-sm`}>
                  {order?.status}
                </Badge>
                <DownloadInvoice order={order} companyLogo={companyLogo} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 p-4 sm:p-6">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">
                  {order?.hotelId?.name || 'Unknown Hotel'}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">
                  {order?.roomId?.room || 'Unknown Room'}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">Order {order?.status}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                {order?.orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-600 text-sm sm:text-base">
                        {item?.quantity}x
                      </span>
                      <span className="text-sm sm:text-base">
                        {item?.menuItem?.name || 'Item Unavailable'}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm sm:text-base">
                      Quantity: {item?.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-sm sm:text-base">Total</span>
                  <span className="text-sm sm:text-base">
                    ₹{order?.totalPrice?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ));
  };

  return (
    <div className="w-full container px-4 sm:px-6 lg:px-8 mx-auto py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
      </div>

      <div className="space-y-4 w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default OrdersPage;