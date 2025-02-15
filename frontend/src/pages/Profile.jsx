import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { AuthContext } from "../Context/AuthContext";
import DashboardLayout from "../components/DashboardLayOut";
import ProfileEditor from "@/components/ProfileEditor";

const Profile = () => {
  const { hotelName } = useParams(); // Get dynamic hotelName from URL
  const location = useLocation();
  const navigate = useNavigate();
  // const authcontext=useContext(AuthContext)
  const {user,tok,loading,setLoading}=useContext(AuthContext)
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true); // New state for loading

//  userData(user)
console.log(user);
// if(user) setLoading(false)
  return (
    <div className="text-">
      <h1 className="text-4xl">Welcome to {hotelName} Profile</h1>

      {loading ? (
        <p>🔄 Verifying token, please wait...</p>
      ) : user ? (
        <ProfileEditor user={user} />
         
      ) : (
        <Button>Verifying token, please wait...</Button>
      )}
    </div>
  );
};

export default Profile;
