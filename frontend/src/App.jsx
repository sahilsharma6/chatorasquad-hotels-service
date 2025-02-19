import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./Context/AuthContext";
import DashboardLayout from "./components/DashboardLayOut";
import HomePage from "./HomePage";
import HotelDetails from "./HotelDetails";
import RestaurantDetails from "./RestaurantDetails";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FoodMenu from "./FoodMenu";
import { ProtectedRoute } from "./Context/ProtectedRoute";
import MenuLayout from "./MenuLayout";
import OrdersPage from "./OrdersPage";

// Custom hook to restore scroll position and handle navigation
const useScrollToTop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change

    // Handle back button press
    const handlePopState = (event) => {
      const previousPath = sessionStorage.getItem('previousPath');
      if (previousPath && location.pathname.includes('/menu')) {
        event.preventDefault();
        navigate(previousPath);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname, navigate]);
};

const AppContent = () => {
  const loc = useLocation();
  const mainLoc = loc.pathname.split('/')[2];

  useScrollToTop(); // Call the scroll restoration hook

  return (
    <>
      {mainLoc !== "profile" && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:hotelName/profile/*" element={<DashboardLayout />} />
        <Route path="/:hotelName" element={<HotelDetails />} />
        <Route path="/:hotelName/:roomName" element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        } />
        <Route path="/:hotelName/:roomName/orders" element={<OrdersPage />} />
        <Route 
          path="/:hotelName/:roomName/:restaurantName/menu" 
          element={<FoodMenu isblock={true}/>} 
        />
        <Route path='/:hotelName/:roomName/chatora-squad/menu' element={<MenuLayout isblock={false}/>} />
        {/* <Route path="/orders" element={<OrdersPage />} /> */}
      </Routes>
      {mainLoc !== "profile" && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

export default App;