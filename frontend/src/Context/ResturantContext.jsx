import apiClient from "@/services/ApiClient";
import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [Restaurants, setRestaurants] = useState(null);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all valid restaurants
    const fetchRestaurant = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/restaurant/valid-restaurants');
            const formattedRestaurants = Array.isArray(response.data) ? response.data : [response.data];
            setRestaurants(formattedRestaurants);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all menus by restaurant ID
    const fetchRestaurantMenu = async (restaurantId) => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/restaurant/menus/${restaurantId}`);
            setMenu(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch a specific menu by menu ID
    const fetchRestaurantMenuById = async (menuId) => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/restaurant/menus/${menuId}`);
            setMenu(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RestaurantContext.Provider value={{
            Restaurants,
            menu,
            loading,
            error,
            fetchRestaurant,
            fetchRestaurantMenu,
            fetchRestaurantMenuById
        }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    return useContext(RestaurantContext);
};
