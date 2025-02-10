import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/:hotelname/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}
export default App;