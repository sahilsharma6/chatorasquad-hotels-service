import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import HomePage from "./HomePage";
import HotelDetails from "./HotelDetails";
import RoomDetails from "./RoomDetails";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import NotFound from "./NotFound"; // Optional

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Dynamic Route: hotelName/profile */}
        <Route path="/:hotelName/profile" element={<Profile />} />

        <Route path="/:hotelName" element={<HotelDetails />} />
        <Route path="/:hotelName/:roomNumber" element={<RoomDetails />} />

        {/* Fallback Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
