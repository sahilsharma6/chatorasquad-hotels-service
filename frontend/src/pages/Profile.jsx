import { useParams, useLocation } from "react-router-dom";
export default function Profile() {
    const { hotelname } = useParams();
    const location = useLocation(); // Get the location object
    const params = new URLSearchParams(location.search); 
    const token = params.get('token'); 
    console.log(token); 
    return (
        <div>
            <h1 className="text-5xl">Welcome!</h1>
            <p className="text-lg">{hotelname}</p>
            <p className="text-lg ">Token: {token}</p> 
        </div>
    );
}