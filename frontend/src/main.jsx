import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HotelProvider } from './Context/HotelContext'
import { RestaurantProvider } from './Context/ResturantContext'
import { Toaster } from './components/ui/toaster'
import { OrderProvider } from './Context/OrderContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HotelProvider>
      <RestaurantProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
        <Toaster />
      </RestaurantProvider>
    </HotelProvider>
  </StrictMode>,
)
