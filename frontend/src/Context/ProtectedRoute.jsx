import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { hotels } from '@/data/hotel-data';
import Cookies from 'js-cookie';

// Generate a secure token
const generateToken = (hotelId, timestamp) => {
  return btoa(`${hotelId}-${timestamp}-${Math.random().toString(36).substring(7)}`);
};

export const ProtectedRoute = ({ children }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { hotelName, roomNumber } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URL format to proper hotel name
  const formatHotelName = (urlName) => {
    return decodeURIComponent(urlName)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Find the hotel in the array
  const hotel = hotels.find(h => h.name === formatHotelName(hotelName));

  const verifyPassword = () => {
    if (hotel && hotel.protect_password === password) {
      const timestamp = Date.now();
      const token = generateToken(hotel.id, timestamp);
  
      // Store in Cookies with a short expiry (10 mins)
      Cookies.set('hotel_auth_token', token, { expires: 1 / 144 }); // 1/144 = 10 minutes
  
      setIsVerified(true);
      setError('');
      
      // Add verification to URL
      setSearchParams({ verify: token });
    } else {
      setError('Incorrect password. Please contact hotel staff.');
    }
  };

  // Check verification on mount
  useEffect(() => {
    if (hotel) {
      const storedData = sessionStorage.getItem(`hotel_verified_${hotel.id}`);
      if (storedData) {
        const { verified, token } = JSON.parse(storedData);
        if (verified && searchParams.get('verify') === token) {
          setIsVerified(true);
        }
      }
    }
  }, [hotel, searchParams]);

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Enter Hotel Password</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      verifyPassword();
                    }
                  }}
                />
              </div>
              
              <Button 
                onClick={verifyPassword}
                className="w-full"
              >
                Verify Password
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error}
                    {hotel?.phoneNo && (
                      <div className="mt-2">
                        Contact Hotel: {hotel.phoneNo}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};