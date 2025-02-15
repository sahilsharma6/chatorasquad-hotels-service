import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HotelProvider } from './Context/HotelContext'
import { RestaurantProvider } from './Context/ResturantContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HotelProvider>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </HotelProvider>
  </StrictMode>,
)
