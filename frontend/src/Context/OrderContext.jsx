import apiClient from "@/services/ApiClient";
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [CurrentOrders, setCurrentOrders] = useState([]);

    const fetchOrderByRoom = async (roomId) => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/admin/getordersbyroomId/${roomId}`);
            setOrders(response.data.orders);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const CreateOrder = async (orderData) => {
        // console.log('orderdata ', orderData);
        
        try {
            setLoading(true);
            const { hotelId, roomId, cart, name, phoneNo } = orderData;

            const orderItems = cart.map(item => ({
                menuItem: item.itemId,
                quantity: item.quantity,
            }));

            const formattedOrderData = {
                hotelId,
                roomId,
                orderItems,
                // name: name, 
                // phoneNo: phoneNo,
            };

            // console.log('order items context',formattedOrderData);

            const response = await apiClient.post("/admin/orderforAdmin", formattedOrderData);

            setCurrentOrders(prevOrders => [...prevOrders, response.data.order]);
            setError(null);

            return {
                orderId: response.data.order._id,
                orderDetails: response.data.order,
                hotelDetails: response.data.hotel,
                roomDetails: response.data.room
            };

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to create order";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <OrderContext.Provider value={{ fetchOrderByRoom, orders, CurrentOrders, CreateOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};