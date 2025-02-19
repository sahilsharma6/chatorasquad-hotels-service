import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Cookies from 'js-cookie';
import { useHotel } from './HotelContext';
import { useToast } from '@/hooks/use-toast';

const generateToken = (hotelId, timestamp) => {
  return btoa(`${hotelId}-${timestamp}-${Math.random().toString(36).substring(7)}`);
};

export const ProtectedRoute = ({ children }) => {
  const { VerifyPassword, fetchHotelByName, HotelDetailsByName } = useHotel();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { hotelName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const hotel_name = decodeURIComponent(hotelName);
  const hotelId = HotelDetailsByName?._id;

  useEffect(() => {
    fetchHotelByName(hotel_name);
  }, [hotel_name]);

  useEffect(() => {
    const storedToken = Cookies.get('hotel_auth_token');
    const urlToken = searchParams.get('verify');

    if (storedToken) {
      if (!urlToken) {
        // If we have a cookie but no URL token, add it to URL
        setSearchParams({ verify: storedToken }, { replace: true });
      } else if (urlToken !== storedToken) {
        // If URL token doesn't match cookie, update URL
        setSearchParams({ verify: storedToken }, { replace: true });
      }
      setIsVerified(true);
    } else if (urlToken) {
      // If we have URL token but no cookie, set the cookie
      Cookies.set('hotel_auth_token', urlToken, { expires: 1 / 144 }); // 10 minutes
      setIsVerified(true);
    }
  }, [searchParams]);

  const verifyPassword = async () => {
    try {
      const response = await VerifyPassword(hotelId, password);
      if (response) {
        const timestamp = Date.now();
        const token = generateToken(hotelId, timestamp);
  
        Cookies.set('hotel_auth_token', token, { expires: 1 / 144 }); // 10 minutes
        setSearchParams({ verify: token }, { replace: true });
  
        setIsVerified(true);
        setError('');
      } else {
        throw new Error("Wrong password");
      }
    } catch (error) {
      setError("Wrong password");
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Wrong password. Please try again.',
      });
    }
  };

  if (isVerified) {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enter Hotel Password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') verifyPassword();
              }}
            />
            <Button onClick={verifyPassword} className="w-full">
              Verify Password
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};