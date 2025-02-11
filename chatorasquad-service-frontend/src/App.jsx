import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import { UserProvider } from "./Context/AuthContext";
import DashboardLayout from "./components/DashboardLayOut";
// import NotFound from "./NotFound"; // Optional

const App = () => {
  return (
    
    <Router><UserProvider>
      <Routes>
        {/* Dynamic Route: hotelName/profile */}
        <Route path="/:hotelName/profile/*" element={<DashboardLayout />} />

        {/* Fallback Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes></UserProvider>
    </Router>
  );
};

export default App;
