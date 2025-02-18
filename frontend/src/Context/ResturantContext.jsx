import apiClient from "@/services/ApiClient";
import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [Restaurants, setRestaurants] = useState(null);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [MenuItems, setMenuItems] = useState(null);

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

    const fetchAdminMenu = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/menu/getItemsWithCategory`);
            const formattedMenuItems = Array.isArray(response.data) ? response.data : [response.data];
            setMenuItems(formattedMenuItems);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getLogoUrl = (logoPath) => {
        if (!logoPath) return null;
        // Assuming your API base URL is configured in your environment
        return `${import.meta.env.IMAGE_URL}/${logoPath}`;
      };

    return (
        <RestaurantContext.Provider value={{
            Restaurants,
            menu,
            loading,
            error,
            fetchRestaurant,
            fetchRestaurantMenu,
            fetchRestaurantMenuById,
            MenuItems,
            fetchAdminMenu,
            getLogoUrl
        }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    return useContext(RestaurantContext);
};
