import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";

const Profile = () => {
  const { hotelName } = useParams(); // Get dynamic hotelName from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (!token) {
      console.error("No token found in URL");
      setLoading(false); // Stop loading since there's no token
      return;
    }

    // Send token to backend for verification
    axios
      .post("http://localhost:3300/api/auth/verify-token", { token }, { withCredentials: true })
      .then((response) => {
        console.log("User Data:", response.data.user);
        setUserData(response.data.user); // Store user data in state
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        // navigate("/"); // Redirect if token is invalid
      })
      .finally(() => {
        setLoading(false); // Stop loading after verification attempt
      });
  }, [location.search, navigate]);

  return (
    <div>
      <h1 className="text-4xl">Welcome to {hotelName} Profile</h1>

      {loading ? (
        <p>🔄 Verifying token, please wait...</p>
      ) : userData ? (
        <div>
          <p>Name: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <Button>Verifying token, please wait...</Button>
      )}
    </div>
  );
};

export default Profile;
