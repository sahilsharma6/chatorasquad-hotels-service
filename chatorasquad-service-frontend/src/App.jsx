import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
// import NotFound from "./NotFound"; // Optional

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Dynamic Route: hotelName/profile */}
        <Route path="/:hotelName/profile" element={<Profile />} />

        {/* Fallback Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
